import * as React from "react"

const RoundedContainer = (props) => {
    return (
        <div className="py-10 px-5 bg-gray-50 rounded-tl-3xl rounded-tr-3xl lg:px-20 flex-1">{props.children}</div>
    )
}

const RegularContainer = (props) => {
    return (
        <div className="py-10 px-5 bg-gray-50 lg:px-20 flex-1">{props.children}</div>
    )
}

export {RoundedContainer, RegularContainer}
