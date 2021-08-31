import * as React from 'react'
import { Link } from 'gatsby'
import { Elements } from 'prismic-richtext'
import { Link as PrismicLink } from 'prismic-reactjs'
import { StaticImage } from "gatsby-plugin-image"

// -- HTML Serializer
const htmlSerializer = function (type, element, content, children, key) {
  switch (type) {
    case Elements.paragraph: // Paragraph
      return <p key={key} className="my-1 text-center">{children}</p>

    case Elements.hyperlink: // Hyperlinks
        return (
            <a
                key={key}
                href={element.data.url}
                target={element.data.target}
                className="text-purple-700"
            >
                {children}
            </a>
        )


    default:
      // Always include a default that returns null
      return null
  }
}

export default htmlSerializer