import * as React from "react"
import Navigation from "../components/navigation"
import sayings from "../sayings"
import ShowMoreText from "react-show-more-text";
import {RoundedContainer, RegularContainer} from '../components/containers'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const Header = () => {
  return (
    <div className="flex items-center flex-col my-8 mx-5 lg:flex-row lg:mx-20">
      <div className="container">
        <h1 className="font-semibold text-5xl">NYU Society For Industrial and Applied Math</h1>
        <h3 className="text-xl text-gray-500 py-2">{sayings[Math.floor(Math.random() * sayings.length)]}</h3>
      </div>
      <StaticImage src="../images/math.svg" objectFit="contain" alt="" className="h-80"></StaticImage>
    </div>
  )
}

const Events = (props) => {
  const eventsList = []
  props.data.forEach((event) => {
    const dates = []
    event.data.dates.forEach((item) => {
      const date = new Date(item.time)
      console.log(date.toDateString())
      const day = String(date.getUTCDate()).padStart(2,'0')
      const month = String(date.getUTCMonth()).padStart(2,'0')
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
      dates.push(fullDate)
    })
    eventsList.push(
      <div key={event.id} className="flex flex-col rounded-xl my-10 space-y-5 lg:space-y-0 lg:space-x-10 lg:flex-row">
        <GatsbyImage objectFit="contain" image={event.data.picture.gatsbyImageData} alt="" className="w-80 flex-shrink-0"></GatsbyImage>
        <div className="flex flex-col space-y-2 text-center lg:text-left">
          <h2 className="text-3xl font-semibold">{event.data.event_title.text}</h2>
          <p className="text-l text-gray-500">
            {dates.join(', ') + " EST"}
          </p>
          <p className="text-xl">{event.data.description.text}</p>
          <div className="flex flex-wrap flex-col space-y-5 items-center lg:flex-row lg:space-x-10 lg:space-y-0">
            {event.data.rsvp.url != null ? <button className="bg-purple-700 font-semibold text-xl px-10 py-3 w-48 rounded-xl text-white">RSVP</button>: null }
            {event.data.youtube.url != null ? <button className="bg-red-600 font-semibold text-xl px-10 py-3 w-48 rounded-xl text-white">YouTube</button>: null }
          </div>
        </div>
      </div>
    )
  })
  return (
    <RoundedContainer>
      <h2 className="text-4xl font-semibold">See our upcoming events</h2>
      {eventsList}
      <a className="text-xl text-gray-500 font-semibold text-center">View past events</a>
    </RoundedContainer>
  )
}

const Instagram = (props) => {
  console.log(props.data)
  const postList = props.data.map((post, index) => 
    <GatsbyImage objectFit="contain" key={post.node.id} image={post.node.localFile.childImageSharp.gatsbyImageData} alt="" className="m-4"></GatsbyImage>
  );
  return (
    <RegularContainer>
      <h2 className="text-4xl font-semibold text-center">Check out our Instagram</h2>
      <div className="flex flex-row flex-wrap justify-center">
        {postList}
      </div>
      <a src="https://www.instagram.com/nyu_siam/">
        <StaticImage src="../images/instagram.png" objectFit="contain" alt="" className="h-10 self-center justify-self-center"></StaticImage>
        <p className="font-semibold text-center text-purple-700">Visit our Instagram</p>
      </a>
    </RegularContainer>
  )
}

const IndexPage = ({data}) => {
  return (
    <div className="bg-purple-200 h-full w-full flex flex-col">
      <Navigation></Navigation>
      <Header></Header>
      <Events data={data.allPrismicEvent.nodes}></Events>
      <Instagram data={data.allInstaNode.edges}></Instagram>
    </div>
  )
}

export const query = graphql`
  query HomeQuery {
    allInstaNode(sort: { fields: [timestamp], order: DESC}) {
      edges {
        node {
          id
          timestamp
          localFile {
            url
            childImageSharp {
              gatsbyImageData(width:300, height:300)
            }
          }
        }
      }
    }
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


export default IndexPage
