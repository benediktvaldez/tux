import React from 'react'
import './styles.css'

import githubLogo from './github.svg'
import aranjaLogo from './aranja.svg'
import jsconfisLogo from './jsconfis.svg'
import reactLogo from './react.svg'

const defaultCompanies = [
  {name: 'Github', logo: githubLogo, url: 'https://github.com'},
  {name: 'Aranja', logo: aranjaLogo, url: 'https://aranja.com'},
  {name: 'JSConf Iceland', logo: jsconfisLogo, url: 'https://jsconf.is'},
  {name: 'React', logo: reactLogo, url: 'https://facebook.github.io/react/'}
]

const FeaturedIn = ({ companies = defaultCompanies }) => (
  <div className="FeaturedIn">
    {companies.map((company) => (
      <a key={company.name} className="FeaturedIn-logo" href={company.url}><img src={company.logo} alt={company.name}/></a>
    ))}
  </div>
)

export default FeaturedIn
