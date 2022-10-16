import React, { useState } from 'react'

export default function TextForm(props) {
    const handleUpClick = () => {
        // console.log("Uppercase was clicked" + text)
        let newText = text.toUpperCase()
        setText(newText)
        props.showAlert("Converted to Uppercase", 'success')
    }
    const handleLoClick = () => {
        // console.log("Lowecase was clicked" + text)
        let newText = text.toLowerCase()
        setText(newText)
        props.showAlert("Converted to Lowercase", 'success')
    }
    const handleCapInitial = () => {
        // console.log("Capitalize Initials was clicked" + text)
        const lower = text.toLowerCase();
        let newText = lower.charAt(0).toUpperCase() + lower.slice(1);
        setText(newText)
        props.showAlert("Initials Capitalization did not work properly", 'warning')
    }
    const handleClearClick = () => {
        // console.log("Clear Text was clicked" + text)
        let newText = ""
        setText(newText)
        props.showAlert("Text cleared successfully", 'success')
    }
    const handleRevClick = () => {
        // console.log("Reverse Text was clicked" + text)
        const arrayStrings = text.split("");
        const reverseArray = arrayStrings.reverse();
        const newText = reverseArray.join("");
        setText(newText)
        props.showAlert("String Reversed Successfully", 'success')
    }
    const handlePalinClick = () => {
        // console.log("Palindrome Text was clicked" + text)
        const arrayValues = text.split('');
        const reverseArrayValues = arrayValues.reverse();
        const reverseString = reverseArrayValues.join('');
        if (text === reverseString) {
            let newText = "It is a palindrome"
            // setText(newText)
            props.showAlert((newText),'info')
        }
        else {
            let newText = "It is not a palindrome"
            // setText(newText)
            props.showAlert((newText),'info')
        }
    }
    const handleCopyClick = () => {
        // let text = document.getElementById("txtArea1");
        // text.select();
        navigator.clipboard.writeText(text);
        // document.getSelection().removeAllRanges()
        props.showAlert('Copied to Clipboard','success')
    }
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/)
        setText(newText.join(" "))
        props.showAlert('Extra Spaces Cleared','success')
    }
    // function countVowels(text) {
    //     const vowels = ["a", "e", "i", "o", "u"];
    //     let count = 0;
    //     for (let letter of text.toLowerCase()) {
    //         if (vowels.includes(letter)) {
    //             count++;
    //         }
    //     }
    //     console.log(count)
    //     let newText = (count)
    //     setText(newText)
    // }
    const handleOnChange = (event) => {
        // console.log("On Change was clicked")
        setText(event.target.value)
    }
    // const timeTaken = () =>{
    //     let timeToRead = (0.003 * text.split(" ").length) -1
    //     timeToRead(timeTaken)
    // }
    // {timeTaken}

    // const handleOnFocus = () => {
    //     let BlankSpace = ""
    //     setText(BlankSpace)
    // }
    // onFocus={handleOnFocus}
    const [text, setText] = useState('')
    // setText("Enter your text here")
    return (
        <>
            <div className={`container my-3 ${props.mode === 'dark' ? 'dark-class' : 'white-class'}`} style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>

                <h3 className='mb-2'>{props.heading}</h3>
                <div className="mb-3">
                    <textarea id="txtArea1" onChange={handleOnChange} value={text} style={{ backgroundColor: props.mode === 'dark' ? '#101d37' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} placeholder="Your Text Here"></textarea>
                </div>
                <button className="glow-on-hover mx-1 my-1" disabled={text.length===0} type="button" onClick={handleUpClick}>Change to Uppercase</button>
                <button className="glow-on-hover mx-1 my-1" disabled={text.length===0} type="button" onClick={handleLoClick}>Change to Lowercase</button>
                <button className="glow-on-hover mx-1 my-1" disabled={text.length===0} type="button" onClick={handleCapInitial}>Capitalize Initials</button>
                <button className="glow-on-hover mx-1 my-1" disabled={text.length===0} type="button" onClick={handleExtraSpaces}>Organise Spaces</button>
                <button className="glow-on-hover mx-1 my-1" disabled={text.length===0} type="button" onClick={handlePalinClick}>Is Palindrome?</button>
                <button className="glow-on-hover mx-1 my-1" disabled={text.length===0} type="button" onClick={handleRevClick}>Reverse Text</button>
                {/* <button className="glow-on-hover mx-1 my-1" type="button" onClick={countVowels}>Vowels</button> */}
                <button className="glow-on-hover mx-1 my-1" type="button" onClick={handleClearClick}>Clear Text</button>
                <div>
                    <button className="glow-on-hover mx-1 my-1" type="button" onClick={handleCopyClick}>Copy</button>
                </div>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#090d16' }}>
                <h5>Your Text Summary:</h5>
                <p>{text.split(/\s+/).filter((elem)=>{return elem.length!==0}).length} words and {text.length} characters</p>   {/*Explanation needed*/}
                <p>It should take you {0.004 * text.split(" ").filter((elem)=>{return elem.length!==0}).length} minutes to read the above text</p>
                {/* <p>The numer of vovels present are {countVowels}</p> */}
                <h4 className="mt-4 my-1">Preview:</h4>
                <p>{text.length > 0 ? text : "Nothing to Preview"}</p>
            </div>
        </>
    )
}
