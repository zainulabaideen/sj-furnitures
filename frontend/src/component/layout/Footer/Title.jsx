import React from 'react'
import logo from "../../../assets/logo[1].png"

const Title = () => {
    return (
        <div className='text-logoClr w-full py-10 flex items-center justify-center' >
            <img className='w-96'
                src={logo}
                alt="sjFurnitures logo" />
        </div>
    )
}

export default Title