import React from "react";
import "../CSS/pay.css";
import 'font-awesome/css/font-awesome.min.css';
import img from "../images/ordinateur-portable-hp-dragonfly-g4-96z84et.jpg"


export default function Pay() {
  return ( <>
    <div class="card">
            <div class="card-body">
                <div class="row upper"></div>
                <div class="row" className="d-flex gap-3 ">
                    <div class="col-md-7" className="d-flex flex-column gap-3 mx-2 " inline>
                        <div class="left border">
                            <div class="row">
                                <span class="header">Payment</span>
                                <div class="icons">
                                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt=""/>
                                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt=""/>
                                    <img src="https://img.icons8.com/color/48/000000/maestro.png" alt=""/>
                                </div>
                            </div>
                            <form>
                                <span>Cardholder's name:</span>
                                <input  placeholder="Linda Williams"/>
                                <span>Card Number:</span>
                                <input  placeholder="0125 6780 4567 9909"/>
                                <div class="row">
                                    <div class="col-4"><span>Expiry date:</span>
                                        <input  placeholder="YY/MM" />
                                    </div>
                                    <div class="col-4"><span>CVV:</span>
                                        <input  id="cvv"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="border border-1 p-3"  >
                            <input  type="text" placeholder="Address" name="address" className="w-50 m-1" />
                            <input  type="tel" placeholder="Phone number" name="numero" className="w-50 m-1" />
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="right border">
                            <div class="header">Order Summary</div>
                            <p>2 items</p>
                            <div class="row item">
                                <div class="col-4 align-self-center"><img class="img-fluid" src={img}/></div>
                                <div class="col-8">
                                    <div class="row text-muted">pc</div>
                                    <div class="row"><b>$ 2600.99</b></div>
                                    <div class="row">Qty:2</div>
                                </div>
                            </div>
                            <div class="row item">
                                <div class="col-4 align-self-center"><img class="img-fluid" src={img}/></div>
                                <div class="col-8">
                                    <div class="row text-muted">pc</div>
                                    <div class="row"><b>$ 1900.99</b></div>
                                    <div class="row">Qty:1</div>
                                </div>
                            </div>
                            <hr/>
                            <div class="row lower">
                                <div class="col text-left">Subtotal</div>
                                <div class="col text-right">$ 4600.98</div>
                            </div>
                            <div class="row lower">
                                <div class="col text-left">Delivery</div>
                                <div class="col text-right">Free</div>
                            </div>
                            <div class="row lower">
                                <div class="col text-left"><b>Total to pay</b></div>
                                <div class="col text-right"><b>$ 46000.98</b></div>
                            </div>
                            
                            <button class="btn">Place order</button>
                        </div>
                    </div>
                </div>
            </div>
            
         <div>
        </div>
        </div>
        </>);
}