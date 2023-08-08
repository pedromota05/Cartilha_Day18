import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../public/logo.svg'
import TableOfContents from '../components/TableOfContents'

export const Capitulos = () => {
    //Importação das Imagens
    var LogoIF = require('../public/ifms-dr-marca-2015.png');
    var LogoEmbrapa = require('../public/logo-embrapa-400.png');
    var LogoIFEmbrapa = require('../public/logo-if-embrapa.png');

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const openSidebar = () => {
        setIsOffcanvasOpen(true);
    };    

    const handleToggle = () => {
        setIsCollapsed((prevState) => !prevState);
    };  
    const handleToggleBackDrop = () => {
        setIsOffcanvasOpen((prevState) => !prevState);
    };

    //Função para quando o usuário clicar no botão "← Voltar para o menu principal"
    const handleToggleMainNavbar = () => {
        const mainNavbarOptionsMenu = document.getElementById('main-navbar-options-menu');
        const summary = document.getElementById('summary');
      
        if (mainNavbarOptionsMenu && summary) {
          mainNavbarOptionsMenu.style.display = 'block';
          summary.style.display = 'none';
        }
    };

    //Função para quando o usuário quiser fechar o sidebar
    const closeSidebar = () => {
        const sidebarMenu = document.getElementById("sidebarMenu");
        if (sidebarMenu) {
          sidebarMenu.classList.remove("show");
        }
        setIsOffcanvasOpen(false);
    }
   
    //useEffect para quando o usuário quiser fechar ou abrir os itens dentro do sumário do sidebar
    useEffect(() => {
        const anchorElement = document.getElementById('collapseExample1');
      
        if (anchorElement) {
            if (isCollapsed) {
                anchorElement.classList.add('collapse');
            } else {
                anchorElement.classList.remove('collapse');
          }
        }
      
        const backButton = document.getElementById('back-button');
        backButton.addEventListener('click', handleToggleMainNavbar);
      
        return () => {
            backButton.removeEventListener('click', handleToggleMainNavbar);
        };
    }, [isCollapsed]);

    return(
        <>
            <Head>
                <title>Embrapa</title>
            </Head>

            {/* Div que Pega todo o Conteúdo da Página */}
            <div className="container-wrapper">
                {/* Código Sidebar */}
                <nav id="sidebarMenu" className={`collapse d-lg-block sidebar bg-white ${isOffcanvasOpen ? 'show' : ''}`} tabIndex="-1">
                    <div className="position-sticky">
                        <div id="summary" className="list-group list-group-flush mt-2 py-2">
                            {/* Logo IF / Embrapa Dentro do Menu */}
                            <div className="logo-container d-flex align-items-center justify-content-between">
                                <a href="/">
                                    <Image className="img-sidebar-top mx-3" src={LogoIFEmbrapa} alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas" width="45%" height={46} priority/>
                                </a>
                                <button id="btn-close-sidebar" type="button" className="btn-close btn-close-dark btn-close-cap" data-bs-dismiss="offcanvas" aria-label="Close" onClick={closeSidebar}></button>
                            </div>
                            <hr className="featurette-divider line-menu"></hr>
                            {/* Botão para Retornar as Opções "Edição Completa e Autores" | Opção Disponível quando a Tela é Menor que 992px */}
                            <button type="button" className="clean-btn navbar-sidebar__back" id="back-button">← Voltar para o menu principal</button>
                            {/* Dropdown do Sumário */}
                            <a className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ripple ${
                                isCollapsed ? 'collapsed' : ''
                                }`}
                                aria-current="true"
                                onClick={handleToggle} 
                            >
                                <span className="w-100 text-primary">Sumário</span>{' '}
                                <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'down'} icon-deg`}></i>
                            </a>
                            {/* Conteúdo do Sidebar, denntro do Dropdown Sumário */}
                            <ul id="collapseExample1"
                                className={`list-group list-group-flush mx-3 ${isCollapsed ? 'collapse' : 'show'}`}
                            >
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Introdução</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Integração Lavoura–Pecuária–Floresta (ILPF)</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Planejamento Alimentar na Bovinocultura Leiteira</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Consórcio de Milho com Forrageiras</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Capins-Elefantes BRS Kurumi e BRS Capiaçu</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Pastagens para Gado de Leite</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Preparo e Seleção de Material de Plantio de Mandioca</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Poda da Goiabeira</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Feijão-Comum</a>
                                </li>
                                <li className="list-group-item py-2">
                                    <a href="#" className="text-reset">Semeadura de Espécies Arbóreas para Revegetação de Áreas Desmatadas por meio de Sistemas Agroflorestais</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Opções Retornadas quando o Usuário Aperta no Botão "← Voltar para o menu principal" */}
                    <div id='main-navbar-options-menu' style={{marginTop: 16}}>
                        <div className="logo-container d-flex align-items-center justify-content-between">
                            <a href="/">
                                <Image className="img-sidebar-top mx-3" src={LogoIFEmbrapa} alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas" width="45%" height={46} priority/>
                            </a>
                            <button id="btn-close-sidebar" type="button" className="btn-close btn-close-dark btn-close-cap" data-bs-dismiss="sidebar" aria-label="Close" onClick={closeSidebar}></button>
                        </div>
                        <hr className="featurette-divider line-menu"></hr>
                        <ul className="navbar-nav ms-auto d-flex itens-menu-cap">
                            <li className="nav-item mx-3">
                                <Link className="nav-link back-item-link py-2" href="/edicao-completa" aria-current="page">
                                    Edição Completa
                                </Link> 
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link back-item-link py-2" href="/autores" aria-current="page">
                                    Autores
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Código Navbar */}
                <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu"
                            aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle Offcanvas" onClick={handleToggleBackDrop}>
                            <i className="fas fa-bars"></i>
                        </button>
                        {/* Logo Navbar */}
                        <a className="navbar-brand" href="/">
                            <Image src={Logo} width="100%" height={26} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas"/>
                        </a>
                        {/* Código dos Itens Exibidos no Navbar */}
                        <ul className="navbar-nav ms-auto d-flex flex-row">
                            <li className="nav-item text-item-link">
                                <Link className="nav-link back-item-link" href="/edicao-completa" aria-current="page">
                                    Edição Completa
                                </Link> 
                            </li>
                            <li className="nav-item text-item-link">
                                <Link className="nav-link back-item-link" href="/autores" aria-current="page">
                                    Autores
                                </Link>
                            </li>
                            {/* Input Search para tela maior que 992px */}
                            <div className="hide-form-search2">
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
                                                <i className="fas fa-search icone-search-cap"></i>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <li className="nav-item">
                                <Image src={LogoIF} className='logotipo me-3 img' width="100%" height={32} alt="Logotipo do IFMS Campus Dourados" priority/>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Image src={LogoEmbrapa} className='logotipo img' width="100%" height={48} alt="Logotipo da Embrapa" priority/>
                            </li>

                            {/* Input Search para tela menor que 992px */}
                            <form className="d-flex rounded-pill position-relative" role="search">
                                <div className="input-group hide-form-search">
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
                        </ul>
                    </div>
                    {isOffcanvasOpen && <div className="offcanvas-backdrop show" onClick={handleToggleBackDrop}></div>}
                </nav>
                
                {/* Conteúdo da Cartilha */}
                <div className='container'>
                    <nav className="home-section" aria-label="Breadcrumbs" style={{marginTop: 110}}>
                        {/* Código Navegação Estrutural | Trilha de Navegção do Usuário */}
                        <ul className="breadcrumbs">
                            <li className="breadcrumbs__item">
                                <Link href="/" className="breadcrumbs__link">
                                    <i className="fas fa-home" style={{fontSize: '13px'}}></i>
                                </Link>
                                <i className="fas fa-chevron-right" style={{fontSize: '10px'}}></i>
                            </li>
                            <li className="breadcrumbs__item">
                                <span className="breadcrumbs__link">Sumário</span>
                                <meta itemProp="position" content="1" />
                                <i className="fas fa-chevron-right" style={{fontSize: '10px'}}></i>
                            </li>
                            <li className="breadcrumbs__item breadcrumbs__item--active">
                                <span className="breadcrumbs__link" itemProp="name">Capins-Elefantes BRS Kurumi e BRS Capiaçu</span>
                                <meta itemProp="position" content="2" />
                            </li>
                        </ul>
                    </nav>

                    <section className="home-section right-sidebar" style={{marginTop: 40}}>
                        {/* Código do Table of Contents */}
                        <TableOfContents />

                        {/* Código dos Textos da Cartilha */}
                        <div id="contents" className="bd-content ps-lg-2">
                            <h1>Capins-Elefantes BRS Kurumi e BRS Capiaçu</h1>
                                <p className='center-textArticle'>Marciana Retore</p>
                        <div>
                            <h2>1. O que é</h2>
                                <p>Os capins-elefantes BRS Kurumi e BRS Capiaçu, desenvolvidos pela Embrapa e parceiros, são da mesma espécie do Napier, indicados para alimentação do gado leiteiro, porém com finalidades diferentes.</p>
                                <p>A cultivar BRS Kurumi apresenta porte baixo (anão), com alta proporção de folhas, de excelente qualidade, recomendada para pastejo rotacionado.</p>
                                <p>Já a BRS Capiaçu é uma cultivar de porte alto, atingindo 4,2 m de altura. É indicada para cultivo de capineiras, visando à suplementação volumosa, na forma de silagem ou picada verde no cocho.</p>

                            <h2>2. Benefícios e/ou vantagens</h2>
                                <p>A BRS Kurumi apresenta 18% a 20% de proteína bruta e 68% a 70% de coeficiente de digestibilidade nas folhas, que é a parte consumida pelos animais. Em função do elevado teor de proteína do capim é imprescindível o fornecimento de alimento energético às vacas, para garantir o aporte adequado de energia e proteína no rúmen, para que a produção de leite ocorra em quantidade e qualidade. A cultivar possui elevada produção de folhas e pequeno alongamento do colmo, devido aos entrenós curtos, o que facilita o manejo do capim, não necessitando de roçadas após o pastejo. Além disso, apresenta intenso perfilhamento.</p>
                                <p>A BRS Capiaçu é indicada para a produção de silagem, apresentando, em média, 5,5% de proteína bruta, e também para ser fornecida picada verde no cocho, com 8% a 9% de proteína bruta. A produção de massa seca é 30% superior aos demais capins da espécie, alcançando 50 toneladas de matéria seca por hectare. Além do elevado potencial produtivo, apresenta resistência ao tombamento, ausência de joçal (pelos), facilidade para colheita mecanizada e permite três a quatro cortes por ano.</p>

                            <h2>3. Como utilizar</h2>
                                <p>O plantio de ambos os capins deve ser feito durante a estação chuvosa, em solos bem drenados e de boa fertilidade, por meio de propagação vegetativa (colmos).</p>
                                <p>Para o plantio da BRS Kurumi, fazer covas com espaçamento de 50 cm x 50 cm ou 80 cm x 80 cm, com cerca de 10 cm de profundidade; colocar e cobrir os colmos, que devem conter cerca de três nós. Recomenda-se a entrada dos animais no piquete quando o capim apresentar 80 cm de altura e a saída quando este for rebaixado a 40 cm de altura. Pastejos muito severos irão esgotar as reservas orgânicas, diminuindo a capacidade de rebrota do capim.</p>
                                <p>Para a BRS Capiaçu, o plantio deve ser feito em sulcos espaçados entre si de 0,80 m a 1,20 m, o que dependerá do maquinário de cada propriedade, com o objetivo de evitar que o rodado do trator e dos implementos agrícolas esmague as touceiras do capim. Os colmos podem ser distribuídos inteiros ou fracionados (contendo três a quatro nós) e enterrados na profundidade de 10 cm a 15 cm. Para fornecimento do material fresco, o ideal é cortá-lo com idade entre 50 dias e 70 dias, por apresentar melhor qualidade nutritiva. Para produção de silagem, a idade indicada para o corte da planta é entre 90 dias e 110 dias; essa faixa de idade é onde o capim apresenta melhor relação entre produção de matéria seca e composição química. A adição de milho triturado (4% a 8%), por exemplo, aumenta o teor de matéria seca da silagem e melhora sua qualidade, por reduzir a produção de efluentes (chorume).</p>
                                <p>Tanto a BRS Kurumi quanto a BRS Capiaçu são muito exigentes em fertilidade. Por isso, antes do plantio, o ideal é fazer a análise de solo para realizar a correção necessária. Após cada pastejo ou corte, recomenda-se aplicação de nitrogênio. Outro ponto importante é que as cultivares são suscetíveis à cigarrinha das pastagens. No entanto, existem inseticidas químicos e biológicos para controle do inseto.</p>
                                <p>As cultivares são materiais de excelente qualidade, porém, como qualquer outro capim-elefante, precisam de água e temperaturas elevadas para se desenvolverem. Portanto, considerando as condições climáticas de Mato Grosso do Sul, é necessário planejar a produção de volumoso durante o período das águas para ter oferta de alimento o ano todo.</p>

                            <h2>4. Onde obter mais informações</h2>
                            <h3>Vídeos</h3>
                                <p className='links-bottom'><a href="#">Capins para gado leiteiro, BRS Kurumi e BRS Capiaçu – Pastagem</a></p>
                                <p className='links-bottom'><a href="#">Produção de mudas de capim-elefante anão BRS Kurumi</a></p>
                            <h3>Publicação</h3>
                                <p className='links-bottom'><a href="#">BRS Capiaçu e BRS Kurumi – Cultivo e uso</a></p>
                                <p className='links-bottom'><a href="#">Características do pasto e desempenho de novilhas leiteiras em pastagem de capim-elefante cv. BRS Kurumi</a></p>

                            <h3>Instituição</h3>
                            <div className="instituicao">
                                <div className="nome-instituicao">Embrapa Agropecuária Oeste</div>
                                <div className="site-instituicao">
                                    <span className="negrito">Site institucional: </span>
                                    <a href="https://www.embrapa.br/agropecuaria-oeste" target="_blank" rel="noopener noreferrer"> https://www.embrapa.br/agropecuaria-oeste</a>
                                </div>
                                <div className="telefone-instituicao">
                                    <span className="negrito">Fone:</span> (67) 3416-9700
                                </div>
                                <div className="cidade-uf-instituicao">
                                    <span className="negrito">Local:</span> Dourados, MS
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>
                </div>
            </div>
            
            {/* Código Footer Embrapa */}  
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