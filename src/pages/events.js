import * as React from "react"
import Navigation from "../components/navigation"
import MathImage from "../images/math.svg"
import sayings from "../sayings"
import ShowMoreText from "react-show-more-text";
import {RoundedContainer, RegularContainer} from '../components/containers'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const Events = ({data}) => {
    const eventsList = data.allPrismicEvent.nodes.map((event, index) => 
      <div key={event.index} className="flex flex-col rounded-xl my-10 space-y-5 lg:space-y-0 lg:space-x-10 lg:flex-row">
        <GatsbyImage image={event.data.picture.gatsbyImageData} alt="" className="w-80 flex-shrink-0"></GatsbyImage>
        <div className="flex flex-col space-y-2 text-center lg:text-left">
          <h2 className="text-3xl font-semibold">{event.data.event_title.text}</h2>
          <p className="text-l text-gray-500">02/11/2020, 02/25/2020, 03/11/2020, 03/25/2020, 04/08/2020, and 04/22/2020 at 6pm ET</p>
          <p className="text-xl">{event.data.description.text}</p>
          <div className="flex flex-wrap flex-col space-y-5 items-center lg:flex-row lg:space-x-10 lg:space-y-0">
            <button className="bg-purple-700 font-semibold text-xl px-10 py-3 w-48 rounded-xl text-white">RSVP</button>
            <button className="bg-red-600 font-semibold text-xl px-10 py-3 w-48 rounded-xl text-white">YouTube</button>
          </div>
        </div>
      </div>
    );
    return (
        <div className="bg-purple-200 h-full w-full flex flex-col">
        <Navigation></Navigation>
        <RoundedContainer>
            <h2 className="text-4xl font-semibold">See our events</h2>
            {eventsList}
        </RoundedContainer>
      </div>
    )
  }


export const query = graphql`
query EventQuery {
  allPrismicEvent {
    nodes {
      id
      data {
        event_title {
          text
        }
        picture {
          url
          gatsbyImageData
        }
        description {
          text
        }
        dates {
          time
        }
      }
    }
  }
}
`

export default Events