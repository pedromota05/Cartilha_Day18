import { useState, useEffect } from 'react';
import TableOfContents from './TableOfContents';

const TextCapitulos = ({lista, activeTitle}) => {
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
          // Verifique se o bloco é do tipo "image"
          // const imageSrc = block.data.file.url;
          const imageSrc = `http://10.11.34.128:1337${block.data.file.url}`;
          const imageCaption = block.data.caption;
          // Crie o elemento de imagem com a nova URL
          htmlContent += `<img src="${imageSrc}" alt="${imageCaption}" />`;
          htmlContent += `<p>${imageCaption}</p>`;
          break;
          // Adicione outros casos para outros tipos de blocos do Editor.js, se necessário.
        default:
          break;
      }
    });
    return htmlContent;
  }
  const currentIndex = lista.findIndex(cap => cap.id === activeTitle);
    const prevChapter = lista[currentIndex - 1];
    const nextChapter = lista[currentIndex + 1];

    const scrollToChapter = (chapterId) => {
        const targetElement = document.getElementById(`capitulo_${chapterId}`);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };
    return (
        <>
        <div className="text-with-toc" id={`capitulo_${lista.id}`}>
            <div className="text-content">
                {lista.map(cap => (
                    <div key={cap.id} className="bd-content ps-lg-2">
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
            </div>
            <div className="table-of-contents">
                <TableOfContents key={activeTitle} headerBlocks={headerBlocks} />
            </div>
        </div>
        <nav className="pagination-nav docusaurus-mt-lg" aria-label="Páginas de documentação" style={{zIndex: 99999}}>
                {prevChapter && (
                    <button
                        className="pagination-nav__link pagination-nav__link--prev"
                        onClick={() => scrollToChapter(prevChapter.id)}
                    >
                        <div className="pagination-nav__sublabel">Anterior</div>
                        <div className="pagination-nav__label">{prevChapter.attributes.title}</div>
                    </button>
                )}
                {nextChapter && (
                    <button
                        className="pagination-nav__link pagination-nav__link--next"
                        onClick={() => scrollToChapter(nextChapter.id)}
                    >
                        <div className="pagination-nav__sublabel">Próxima</div>
                        <div className="pagination-nav__label">{nextChapter.attributes.title}</div>
                    </button>
                )}
            </nav>

        </>
    );
};

export default TextCapitulos;
