import React from 'react';
import 'tachyons';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonClick}) => {
	return(
		<div>
			<p style={{fontSize:"20px"}}>This Magic Brain will detect <b>faces</b> in your pictures. Give it a try! (Enter an Image Address)</p>
			<div className="form center shadow-3" style={{height:"100px"}}>
				<input type="text" placeholder="Enter image address.." className="w-60 h2" style={{marginRight: "5px"}} onChange={onInputChange}/> 
				<button className="bg-hot-pink br2 grow w-30 h2 f4 ph3 pv2 dib b" onClick={onButtonClick}>Detect</button>
			</div>
		</div>	
	);
}

export default ImageLinkForm;