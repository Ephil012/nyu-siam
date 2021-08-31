import * as React from "react"
import Navigation from "../components/navigation"
import { RoundedContainer } from '../components/containers'
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from 'gatsby'
import { Link, RichText } from 'prismic-reactjs'
import htmlSerializer from "../components/htmlSerializer"

const AboutPage = ({data}) => {
    const document = data.prismicAbout.dataåå
    return (
    <div className="bg-purple-200 h-full w-full flex flex-col">
        <Navigation></Navigation>
        <RoundedContainer>
            <div className="flex flex-col items-center align-center">
                <h2 className="text-4xl font-semibold text-center">{document.title.text}</h2>
                <GatsbyImage image={document.picture.gatsbyImageData} alt="" className="w-72 my-8"></GatsbyImage>
                <RichText render={document.body.raw} htmlSerializer={htmlSerializer}/>
            </div>
        </RoundedContainer>
    </div>
    )
}

export const query = graphql`
  query About {
    prismicAbout {
      data {
        title {
          text
        }
        picture {
            gatsbyImageData(placeholder: NONE)
        }
        body {
            raw
        }
      }
    }
  }
`

export default AboutPage
