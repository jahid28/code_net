import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const SingleProfile = (props:any) => {
  return (
    <div>
      <div className="flex items-center">
        <Link className="flex items-center" href={`/account/${props.userName}`}>
          <Image
            className="rounded-full"
            src={props.profilePic}
            width={40}
            height={40}
            alt="profile pic"
          />
          <p className="ml-2 text-lg w-fit">{props.name}</p>
          <p className="ml-1 text-lg w-fit opacity-50">@{props.userName}</p>
        </Link>
        </div>

        <br />
        <hr />
        <br />
    </div>
  )
}

export default SingleProfile
