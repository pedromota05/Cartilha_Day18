import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Autores = () => {
    var Logo = require('../public/logo.svg');
    var LogoIF = require('../public/ifms-dr-marca-2015.png');
    var LogoEmbrapa = require('../public/logo-embrapa-400.png');
    var LogoIFEmbrapa = require('../public/logo-if-embrapa.png');

    const [data, setData] = useState([]);

    useEffect(() => {
        CarregaAutores();
        document.title = 'Embrapa Autores';
    }, []);

    const CarregaAutores = async () => {
        const url = 'http://localhost:1337/api/autors?populate=*';
        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                const data = json.data;
                console.log('API response:', data);
                setData(data);
            } else {
                throw new Error('Falha na requisição. Código de status: ' + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" aria-label="Offcanvas navbar large">
                <div className="container-fluid">
                    <div className="d-flex align-items-center"> 
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
                            <i className="fas fa-bars"></i>
                        </button>
                        <a className="navbar-brand" href="/">
                            <Image src={Logo} width={350} height={54} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" priority/>
                        </a>
                    </div>
                    <div className="first-form-search">
                        <form className="d-flex rounded-pill p-1 position-relative first-form-search" role="search">
                            <div className="input-group">
                                <input
                                    className="form-control border-0 rounded-pill pr-5"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <div className="input-group-append">
                                    <span className="">
                                        <i className="fas fa-search icone-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="offcanvas offcanvas-start text-bg-light" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
                        <div className="offcanvas-header">
                            <ul className="navbar-nav d-flex links-logo-ifembrapa flex-row mx-1">
                                <li className="nav-item">
                                    <Image src={LogoIFEmbrapa} className='me-3' width="100%" height={46} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" priority/>
                                </li>
                            </ul>
                            <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <hr className="featurette-divider"></hr>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 center-itens mx-1">
                                <li className="nav-item">
                                    <Link className="nav-link back-item-link" href="/edicao-completa" aria-current="page">
                                        Edição Completa
                                    </Link>     
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link back-item-link" href="/autores" aria-current="page">
                                        Autores
                                    </Link>
                                </li>
                            </ul>
                            <form id="searchForm" className="d-flex rounded-pill p-1 position-relative" role="search">
                                <div className="input-group">
                                    <input
                                        className="form-control border-0 rounded-pill pr-5"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                    <div className="input-group-append">
                                        <span className="">
                                            <i className="fas fa-search icone-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <ul className="navbar-nav d-flex links-logo flex-row">
                                <li className="nav-item second-logo-inst">
                                    <Image src={LogoIF} className='logotipo me-3' width="100%" height={32} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" priority/>
                                </li>
                                <li className="nav-item second-logo-inst">
                                    <Image src={LogoEmbrapa} className='logotipo' width="100%" height={48} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" priority/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="showcaseSection">
                <div className="headerTitle">
                    <h1>Autores</h1>
                </div>
                <div className="main-container-cards container-cards">
                {data.length > 0 ? (
                    data.map((item) => (
                    <div key={item.id} className="card">
                        <div className="containerAutor_v1t1">
                            <div className="containerFoto_oz_I">
                                <img src={`http://localhost:1337${item.attributes?.image?.data?.attributes?.url}`} alt="Imagem" width="100%"/>
                            </div>
                            <p className="bold nome-autor">{item.attributes.name}</p>
                        </div>
                        <div className="cardContainer_HEVx">
                            <p className="descricao-autor">{item.attributes.description}</p>
                        </div>
                        <div className="action-card">
                            <a target="_blank" href={item.attributes.url}>Currículo Lattes</a>
                        </div>
                    </div>
                    ))
                    ) : (
                        <p>Carregando dados...</p>
                    )}
                </div>
            </div>
                
            <footer>
                <div className="container container-footer">
                    <div className="title-footer">
                        <p>Embrapa Agropecuária Oeste</p>
                    </div>
                    <div className="description-footer">
                        <p>Rodovia BR 163, Km 253,6, Caixa Postal 449, CEP: 79804-970, Dourados, MS</p>
                        <p>Fone: + 55 (67) 3416-9700</p>
                    </div>
                </div>
            </footer>   
        </>
    );
};