// import { Button, Card, Badge, Spinner } from 'react-bootstrap';
// import { useState } from 'react';
// import pc from "../images/ordinateur-portable-hp-dragonfly-g4-96z84et.jpg";
// import "../CSS/product.css";
// import { Link } from 'react-router-dom';

// export default function Product({ products }) {
//   const [mainImage] = useState(() => {
//     const img = [products.Image, products.Image2, products.Image3, products.Image4, products.Image5]
//       .find(img => img !== null);
    
//     if (img && !img.startsWith('http')) {
//       return `http://127.0.0.1:8000/storage/${img.replace('public/', '')}`;
//     }
//     return img || pc;
//   });

//   if (!products) {
//     return (
//       <Card style={{ width: '18rem', height: '25em' }}>
//         <Card.Body className="d-flex justify-content-center align-items-center">
//           <Spinner animation="border" variant="warning" />
//         </Card.Body>
//       </Card>
//     );
//   }

//   const { name, Prix, Quantité_en_stock ,id,type} = products;
//   const originalPrice = parseFloat(Prix) * 1.2;
//   const discount = originalPrice - Prix;

//   return (
//     <div className="position-relative d-inline-block m-3">
//       <Card style={{ width: '18rem', height: '25em' }}> 

//       <Link to={`/Details/${id}/${type}`} onClick={() => console.log(`Navigating to: /Details/${id}/${type}`)}>
//         <Card.Img variant="top" src={mainImage} loading="lazy" alt={name} className="product-image"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = pc;
//             e.target.className = "product-image fallback";
//           }}
//           style={{ width: "100%", height: "200px", objectFit: 'contain',backgroundColor: '#f8f9fa' }}
//         />
//         </Link>
        
//         <Card.Body>
//           <Card.Title>{name.substring(0, 35)} ...</Card.Title>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <span className="text-decoration-line-through text-muted me-2">
//                 {originalPrice.toFixed(2)} DH
//               </span>
//               <span className="h5">{Prix} DH</span>
//             </div>
//           </div>
//           <Badge bg={Quantité_en_stock > 0 ? "success" : "danger"}>
//             {Quantité_en_stock > 0 ? "In Stock" : "Out of Stock"}
//           </Badge>
//           {discount > 0 && (
//             <Badge bg="danger" className="mt-2">
//               Save {discount.toFixed(2)} DH
//             </Badge>
//           )}
          
//           <Button variant="warning" className="w-100 mt-3">
//             View Details
//           </Button>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }