import { useState } from 'react';
import img from "../images/quote.webp"

export default function Devis() {

  return (<>
  <div className=' bg-danger text-center'>
  <h4>Demander un devis</h4>
  <img src={img} alt='Icon' style={{height:'60px',width:'60px'}} />
  <p  style={{width:'700px',textAlign:"center"}}>Vous êtes un professionnel? Nous sommes à votre disposition pour vous fournir un devis gratuitement et rapidement. N'hésitez pas à remplir le formulaire ci-dessous, nos commerciaux se tiendront à votre disposition pour vous répondre dans les plus brefs délais, généralement en moins de 24 heures.</p>
  </div>
    
  <div></div>
    </>
  );
}
