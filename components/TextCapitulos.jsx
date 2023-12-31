import { useState, useEffect, useRef } from 'react';
import TableOfContents from './TableOfContents';

const TextCapitulos = ({lista, activeTitle, setActiveTitle}) => {
  const [headerBlocks, setHeaderBlocks] = useState([]);

  useEffect(() => {
    const extractedHeaderBlocks = [];
    lista.forEach((cap) => {
      const blocks = JSON.parse(cap.attributes.description).blocks;
      blocks.forEach((block) => {
        if (block.type === 'header') {
          extractedHeaderBlocks.push(block);
        }
      });
    });
    setHeaderBlocks(extractedHeaderBlocks);
    console.log("headerBlocks:", headerBlocks);
  }, [lista]);

  function convertToHTML(data) {
    let htmlContent = ''; // Variável para armazenar o conteúdo HTML
    
    data.blocks.forEach((block) => {
      switch (block.type) {
        case 'header':
          const anchor = block.data.text.replace(/ /g, "_"); // Criar âncora
          htmlContent += `<h${block.data.level} class="titulo" id='${anchor}'>${block.data.text}</h${block.data.level}>`;
          break;
        case 'paragraph':
          htmlContent += `<p class="paragrafo">${block.data.text}</p>`;
          break;
        case 'list':
          const listType = block.data.style === 'ordered' ? 'ol' : 'ul';
          let listItemsHTML = '';
          block.data.items.forEach((item) => {
            listItemsHTML += `<li>${item}</li>`;
          });
          htmlContent += `<${listType} class="lista">${listItemsHTML}</${listType}>`;
          break;
          case 'image':
            // Use a URL do Cloudinary fornecida no bloco de dados
            const imageSrc = block.data.file.url;
            const imageCaption = block.data.caption;
  
            // Crie o elemento de imagem com a URL do Cloudinary
            htmlContent += `<img src="${imageSrc}" alt="${imageCaption}" />`;
            htmlContent += `<p>${imageCaption}</p>`;
            break;
          // case 'embed':
          //   // Use a URL do Cloudinary fornecida no bloco de dados
          //   const videoSrc = block.data.source;
          //   const videoCaption = block.data.caption;
  
          //   // Crie o elemento de vídeo usando a URL do Cloudinary
          //   htmlContent += `<iframe width="560" height="315" src="${videoSrc}" frameborder="0" allowfullscreen></iframe>`;
          //   htmlContent += `<p>${videoCaption}</p>`;
          //   break;
          // Adicione outros casos para outros tipos de blocos do Editor.js, se necessário.
        default:
          break;
      }
    });
    return htmlContent;
  }
  const chapterRefs = useRef({}); // Use useRef to store references to chapter elements
  const currentIndex = lista.findIndex((cap) => cap.id === activeTitle);
  const prevChapter = lista[currentIndex - 1];
  const nextChapter = lista[currentIndex + 1];

  const handleNavigation = (chapterId) => {
    setActiveTitle(chapterId);
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adicionando um efeito de rolagem suave
    });
  };

  return (
    <>
      <div className="text-with-toc">
        <div className="text-content">
          <article className='article'>
            {lista.map((cap) => (
              <div key={cap.id} className="bd-content ps-lg-2" ref={(el) => (chapterRefs.current[cap.id] = el)}>
                {activeTitle === cap.id && (
                  <h1>{cap.attributes.title}</h1>
                )}
                {activeTitle === cap.id && (
                  <div className='center-textArticle'>{cap.attributes.subtitle}</div>
                )}
                {activeTitle === cap.id && (
                  <div dangerouslySetInnerHTML={{ __html: convertToHTML(JSON.parse(cap.attributes.description)) }} />
                )}
              </div>
            ))}
          </article>
        </div>
        <div className="table-of-contents">
          <TableOfContents key={activeTitle} headerBlocks={headerBlocks} />
        </div>
      </div>
      <nav className="pagination-nav docusaurus-mt-lg" aria-label="Páginas de documentação" style={{ zIndex: 99999 }}>
        {prevChapter && (
          <button
            className="pagination-nav__link pagination-nav__link--prev"
            onClick={() => handleNavigation(prevChapter.id)}
          >
            <div className="pagination-nav__sublabel">Anterior</div>
            <div className="pagination-nav__label"><i className="fas fa-angle-double-left" style={{fontSize: 12, fontWeight: 'bold', marginRight: 3}}></i>{prevChapter.attributes.title}</div>
          </button>
        )}
        {nextChapter && (
          <button
            className="pagination-nav__link pagination-nav__link--next"
            onClick={() => handleNavigation(nextChapter.id)}
          >
            <div className="pagination-nav__sublabel">Próxima</div>
            <div className="pagination-nav__label">{nextChapter.attributes.title}<i className="fas fa-angle-double-right" style={{fontSize: 12, fontWeight: 'bold', marginLeft: 5}}></i></div>
          </button>
        )}
      </nav>
    </>
  );
};

export default TextCapitulos;
