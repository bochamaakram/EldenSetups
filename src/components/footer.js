import React from "react"
import img from "../images/outil.png"
import img1 from "../images/appel.png"
import img2 from "../images/whatsapp (1).png"
import img3 from "../images/enveloppe (1).png"
import { Link } from "react-router-dom"

function MyFooter(){
    return( 
    <footer className="page-footer font-small blue pt-4  mt-5" style={{backgroundColor:'#111111'}}>
    <div className="container-fluid text-center text-md-left" style={{color:'#b2b2b2',display:"flex",justifyContent:"center"}}>
        <div className="row">
            <div className="col-md-4" >
                <h5 className="text-start" style={{color:'white'}}>À propos de RAMSYS</h5><br/>
                <h5 className="text-start">RAMSYS</h5><br/>
                <p style={{textAlign:"start", width:"75%",marginLeft:'10px'}}>ramsysa.ma est un site marocain d'e-commerce spécialisé dans la vente en ligne de matériel informatique et électronique.
                Nous vous livrons partout au Maroc :<br/> Casablanca , Rabat , Marrakech , Tanger , Kenitra ,
                Mohammedia, Agadir, Meknès , Fès , Oujda , Dakhla</p>
            </div>

            <hr className="clearfix bg-secondary w-100 d-md-none pb-0"/>

            <div className="col-md-2 mb-md-0 mb-3">
                <h5 className="text-start" style={{color:'white'}}>Informations</h5>
                <ul className="list-unstyled text-start lh-lg">
                    <li><Link to='/livraison' style={{color:'#b2b2b2',textDecoration:"none"}}> &gt; Modes de livraison </Link></li>
                    <li><Link to='/about' style={{color:'#b2b2b2',textDecoration:"none"}}> &gt; Qui sommes nous?</Link></li>
                </ul>
            </div>

            <div className="col-md-2 mb-md-0 mb-3">
                <h5 className="text-start" style={{color:'white'}}>Mon compte</h5>
                <ul className="list-unstyled text-start lh-lg" >
                    <li><a href="#!" style={{color:'#b2b2b2',textDecoration:"none"}}> &gt; Link 1</a></li>
                    <li><a href="#!" style={{color:'#b2b2b2',textDecoration:"none"}}> &gt; Link 2</a></li>
                    <li><a href="#!" style={{color:'#b2b2b2',textDecoration:"none"}}> &gt; Link 3</a></li>
                    <li><Link to='/devis' style={{color:'#b2b2b2',textDecoration:"none"}}> &gt; Demander un devis</Link></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-start" style={{color:'white' }}>Contactez-nous</h5>
                <ul className="list-unstyled text-start lh-lg">
                    <li><img src={img} alt="outil" style={{width:'20px'}}/></li>
                    <li><a href="#!" style={{color:'#b2b2b2',textDecoration:"none"}}>ramsysa.ma</a></li>
                    <li>IMM BERDAI N 101</li>
                    <li>40000 Marrakech </li>
                    <li>Maroc</li><br/>
                    <li><img src={img1} alt="outil" style={{width:'20px'}}/> (+212) 05 00 00 00 00</li> 
                    <li><img src={img2} alt="outil" style={{width:'20px'}}/> (+212) 05 00 00 00 00</li>
                    <li><img src={img3} alt="outil" style={{width:'20px'}}/> service.client@ramsys.ma</li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3" style={{color:'#b2b2b2'}}>© 2025 Copyright : <br/>
        <a href="https://github.com/YoussefAitBelfadil" style={{color:'#b2b2b2',textDecoration:"none"}}> YoussefAitBelfadil</a>
    </div>

</footer>
);
}

export default MyFooter