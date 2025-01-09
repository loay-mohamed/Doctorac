import React from 'react'



const Footer = () => {
    return (
        <>
            <footer>
                <div className='container mx-auto'>
                    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                        <div>
                            <h1 className='font-bold text-gray-700 mb-3 text-2xl'>DOCTORAC</h1>
                            <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        <div>
                            <h2 className='text-xl font-medium mb-5'>COMPANY</h2>
                            <ul className='flex flex-col gap-2 text-gray-600'>
                                <li>Home</li>
                                <li>About us</li>
                                <li>Contact us</li>
                                <li>Privacy policy</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className='text-xl font-medium mb-5'>GET IN TOUCH</h2>
                            <ul className='flex flex-col gap-2 text-gray-600'>
                                <li>01021094188</li>
                                <li>loaym3003@gmail.com</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </footer>
            <hr />
        </>
    )
}

export default Footer