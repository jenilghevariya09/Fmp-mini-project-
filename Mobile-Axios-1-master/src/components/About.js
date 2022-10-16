import React from 'react'

export default function About(props) {

    return (
        <>
            <h2 className="my-2 mx-4" style={{ backgroundColor: props.mode === 'dark' ? '#090d16' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} >About Us</h2>
            <div className="container" style={{ backgroundColor: props.mode === 'dark' ? '#090d16' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} >
                <div className="accordion" id="accordionExample" border='2' style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'black' : 'white'}}>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Analyze Your Text
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'white' : 'black'}}>
                                <strong>TextUtils</strong> gives you a way to analyze your text quickly and efficiently. Be it word count, character count or other formatting your text
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Free To Use
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>
                                <strong>TextUtils</strong> is a free character counter tool that provides instant character count & word count statistics for a given text. TextUtils reports the number of words and characters. Thus it is suitable for writing text with word/character limit.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Browser Compatible
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>
                                <strong>TextUtils</strong> is word counting software works in any web browsers such as Chrome, Firefox, Internet Explorer, Safari, Opera. It suits to count characters in facebook, blog, books, excel document, pdf document, essays, etc.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
