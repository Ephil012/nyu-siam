import * as React from "react"
import Navigation from "../components/navigation"
import MathImage from "../images/math.svg"
import sayings from "../sayings"
import ShowMoreText from "react-show-more-text";
import {RoundedContainer, RegularContainer} from '../components/containers'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const Events = ({data}) => {
  const upcomingEventsList = []
  const pastEventsList = []
  data.allPrismicEvent.nodes.forEach((event) => {
    const dates = []
    const dateStrings = []
    event.data.dates.forEach((item) => {
      const date = new Date(item.time)
      console.log(date.toDateString())
      const day = String(date.getUTCDate()).padStart(2,'0')
      const month = String(date.getUTCMonth() + 1).padStart(2,'0')
      const year = String(date.getUTCFullYear())

      let fullDate = month + "/" + day + "/" + year + " @ "

      let hour = date.getUTCHours() - 4
      const minute = String(date.getUTCMinutes()).padStart(2,'0')

      if (hour >= 12) {
        if (hour > 12) {
          hour = hour - 12
        }
        fullDate += String(hour).padStart(2,'0') + ":" + minute + " pm"
      } else {
        fullDate += String(hour).padStart(2,'0') + ":" + minute + " am"
      }
      dates.push(date)
      dateStrings.push(fullDate)
    })
    // todo sort dates automatically
    var upcoming = false
    dates.forEach((date) => {
      const today = new Date()
      if(today <= date) {
        upcoming = true
      }
    })
    var eventItem = (
      <div key={event.id} className="flex flex-col items-center rounded-xl my-10 space-y-5 lg:space-y-0 lg:items-start lg:space-x-10 lg:flex-row">
        <GatsbyImage objectFit="contain" image={event.data.picture.gatsbyImageData} alt="" className="w-80 flex-shrink-0"></GatsbyImage>
        <div className="flex flex-col space-y-2 text-center lg:text-left">
          <h2 className="text-3xl font-semibold">{event.data.event_title.text}</h2>
          <p className="text-l text-gray-500">
            {dateStrings.join(', ') + " EST"}
          </p>
          <p className="text-xl">{event.data.description.text}</p>
          <div className="flex flex-wrap flex-col space-y-5 items-center lg:flex-row lg:space-x-10 lg:space-y-0">
            {event.data.rsvp.url != null ? <a href={event.data.rsvp.url}><button className="bg-purple-700 font-semibold text-xl px-10 py-3 w-48 rounded-xl text-white">RSVP</button></a>: null }
            {event.data.youtube.url != null ? <a href={event.data.youtube.url}><button className="bg-red-600 font-semibold text-xl px-10 py-3 w-48 rounded-xl text-white">YouTube</button></a>: null }
          </div>
        </div>
      </div>
    )
    if(upcoming == true) {
      upcomingEventsList.push(
        eventItem
      )
    } else {
      pastEventsList.push(
        eventItem
      )
    }
  })
  return (
    <div className="bg-purple-200 h-full w-full flex flex-col">
      <Navigation></Navigation>
      <RoundedContainer>
        <h2 className="text-4xl font-semibold">See our upcoming events</h2>
        {upcomingEventsList.length ? upcomingEventsList : <p className="text-center text-purple-500 text-semibold text-xl mt-4">No upcoming events at this time</p>}
        <h2 className="text-4xl font-semibold">See our past events</h2>
        {pastEventsList.length ? pastEventsList : <p className="text-center text-purple-500 text-semibold text-xl mt-4">No past events at this time</p>}
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
          gatsbyImageData(placeholder: NONE)
        }
        description {
          text
        }
        dates {
          time
        }
        rsvp {
          url
        }
        youtube {
          url
        }
      }
    }
  }
}
`

export default Events