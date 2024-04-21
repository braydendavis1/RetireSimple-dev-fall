import {Box, Typography} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'; 
import SettingsNav from './SettingsNav';
  
export function SetUpPage() { 
	return (<div>
		<SettingsNav />
		<h1>How to Use RetireSimple</h1>
		<Box sx={{padding: '2rem'}}>
			<br />
			<Typography variant='body1'>
				This software and its source code is licensed under and subject to the terms of
				the <Link to='https://opensource.org/licenses/MIT'>MIT License</Link>
			</Typography>
			<Typography variant='body1'>
				Source Code is available on{' '}
				<Link to='https://github.com/braydendavis1/RetireSimple-dev-fall'>GitHub</Link>.
			</Typography>
			<br />
			<Typography variant='h6'>DISCLAIMER</Typography>
			<Typography variant='body1'>
				<strong>
					The information provided/generated by RetireSimple and its Engine should not
					be the only source of information you use to make financial decisions. You
					should consult with a certified financial professional (especially one that
					is a certified fiduciary) before making any financial decisions or taking
					any actions related to your finances.
				</strong>
			</Typography>
			<br />
			<Typography variant='body1'>
				<strong>
					RetireSimple and any derivative application using the RetireSimple Engine is
					not responsible for any financial decisions or actions you take based on the
					information provided/generated by RetireSimple.
				</strong>
			</Typography>
		</Box>
	</div>
	);
} 

// const SlideshowModal = ({ onClose }) => {
//     const [images, setImages] = useState([]);
  
//     useEffect(() => {
//       // Fetch images from backend API
//       fetchImagesFromBackend()
//         .then(images => setImages(images))
//         .catch(error => console.error('Error fetching images:', error));
//     }, []);
  
//     const fetchImagesFromBackend = async () => {
//       // Make API call to fetch images from backend
//       const response = await fetch('/api/images');
//       const data = await response.json();
//       return data.images; // Assuming the response contains an array of image URLs
//     };
  
//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <span className="close-btn" onClick={onClose}>&times;</span>
//           <div className="slideshow">
//             {images.map((image, index) => (
//               <img key={index} src={image} alt={`Slide ${index}`} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };