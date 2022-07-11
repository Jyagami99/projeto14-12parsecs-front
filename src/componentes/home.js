import React, { useEffect } from "react";
import styled from 'styled-components';
import Produto from "./produto";
import Topo from "./topo.js";
import Loader from "./loader";
import axios from "axios"


export default function Home() {
  
    const [clicado, setClicado] = React.useState(false);
    const [products, setProducts] = React.useState([]);   

    function clica(){
        if(clicado){
            setClicado(false);
        }else{
            setClicado(true);
        }
    }

    useEffect(() => {
      const request = axios.get(`http://localhost:5000/products`);
      request.then( response => {
        setProducts(response.data);
      })
    }, []);

    return (
        <>
      <Topo/>
      <Container>
      <Filtros className={(clicado)? "aparece":""}>
      <div onClick={clica}>
        <ion-icon name="caret-forward-outline"></ion-icon>  
        <h1>
          Filtros
        </h1>
        </div>
      </Filtros>
      <AreaProdutos>
        <h2>
            Todos os produtos
        </h2>
        <Produtos>
          {(products.length !==0)?
          products.map((product, index) => <Produto key = {index} name = {product.name} images ={product.images} price ={product.price} id={product.id}/>): <Loader/>}
        </Produtos>
      </AreaProdutos>
      </Container>
      </>
    );
  }

  const Filtros = styled.div`
    width: 400px;
    height: 100vh;
    background: white;
    position: relative;
    margin-left: -350px;
    transition: all 1s;
   
    ion-icon {
        font-size: 30px;
        position: absolute;
        right: -13px;
        top: 40vh;
        background-color: white;
        border-radius: 15px;
    }
    h1 {
      font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: black;
    margin-left: 20px;
    margin-top: 15px;
    }
  `;

  const Container = styled.div`
    display: flex;
    .aparece {
        margin-left: 0px;
    }

  `;
  const AreaProdutos = styled.div`
  h2{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: black;
    margin-left: 20px;
    margin-top: 15px;
   }
  `;

  const Produtos = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
    margin-top: 15px;
    }
  `;