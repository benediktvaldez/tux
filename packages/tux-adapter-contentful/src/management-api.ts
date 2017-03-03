import axios from 'axios'
import {AxiosInstance} from 'axios'

class ManagementApi {
  private client: AxiosInstance
  private space: string

  previewApi: any

  constructor (space: string, accessToken: string) {
    this.space = space
    this.previewApi = null
    this.client = axios.create({
      baseURL: `https://api.contentful.com`,
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  }

  get(url: string, params?: Object): Promise<any> {
    return this.client.get(url, { params }).then(result => result.data) as Promise<any>
  }

  put(url: string, body: any, version: string): Promise<any> {
    return this.client.put(url, body, {
      headers: {
        'X-Contentful-Version': version,
      }
    }).then(result => result.data) as Promise<any>
  }

  post(url : string, body : any, contentType : string) {
    return this.client.post(url, body, {
      headers: {
        'Content-Type': contentType,
      }
    }).then(result => result.data) as Promise<any>
  }

  getEntry(id : string) {
    return this._getEntity(id, 'entries')
  }

  getAsset(id : string) {
    return this._getEntity(id, 'assets')
  }

  _getEntity(id : string, entityPath : string) {
    return this.get(`/spaces/${this.space}/${entityPath}/${id}`)
  }

  async saveEntry(entry : any) {
    return this._save(entry, 'entries')
  }

  async saveAsset(asset : any) {
    return this._save(asset, 'assets')
  }

  processAsset(id : string, localeName : string, version : any) {
    return this.put(`/spaces/${this.space}/assets/${id}/${localeName}/process`, null, version)
  }

  async _save(entity : any, entityPath : string) {
    console.log(`managementApi.save, would be saving ${entityPath}`)
    // console.log(`managementApi.save, saving ${entityPath}`)
    // const { fields, sys: { id, version } } = entity
    // const newEntry = await this.put(`/spaces/${this.space}/${entityPath}/${id}`, { fields }, version)
    //
    // if (this.previewApi) {
    //   this.previewApi.override(this.formatForDelivery(newEntry))
    // }
    //
    // return newEntry
  }

  createUpload(file : File) {
    const url = `https://upload.contentful.com/spaces/${this.space}/uploads`
    // this.post(url, file, 'application/octet-stream')

    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open('POST', url, true)
      request.setRequestHeader('Content-Type', 'application/octet-stream')
      request.setRequestHeader('Authorization', 'Bearer b9c30085503d94228c03bf433742f6c23c59c49ff61770a2631a22b9b07807fc')
      request.onload = () => {
        resolve(request.response.data)
      }

      request.onerror = () => {
        reject('Could not create upload')
      }

      request.send(file)
    })

    return promise
  }

  createAssetFromUpload(upload : any, localeName : string, title : string, contentType : string, fileName : string) {
    const url = `https://upload.contentful.com/spaces/${this.space}/assets`
    const body = {
      fields: {
        title: {
          [localeName]: title,
        },
        file: {
          [localeName]: {
            contentType,
            fileName,
            uploadFrom: {
              sys: {
                upload,
              }
            }
          }
        }
      }
    }

    return this.post(url, body, 'application/json')
  }

  async getTypeMeta(type: string) {
    const [
      contentType,
      editorInterface,
    ] = await Promise.all([
      this.get(`/spaces/${this.space}/content_types/${type}`),
      this.get(`/spaces/${this.space}/content_types/${type}/editor_interface`),
    ])

    contentType.fields.forEach((field: any) => {
      field.control = editorInterface.controls.find((editor: any) => editor.fieldId === field.id)
    })
    return contentType
  }

  async getPreviewToken() {
    const previewApiKeys = await this.get(`/spaces/${this.space}/preview_api_keys`)
    const apiKey = previewApiKeys.items[0]
    return apiKey && apiKey.accessToken
  }

  getUser() {
    return this.get('/user')
  }

  getSpace() {
    return this.get(`/spaces/${this.space}`)
  }

  formatForDelivery(entry: any) {
    Object.keys(entry.fields).forEach(name => {
      const value = entry.fields[name]
      entry.fields[name] = value && value['en-US']
    })
    return entry
  }
}

export default ManagementApi
