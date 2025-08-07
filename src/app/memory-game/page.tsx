import React from 'react'

const page = () => {
    if (typeof window !== "undefined") return <>
    </>
      return <div>this is the memory game page</div>;
}

export default page