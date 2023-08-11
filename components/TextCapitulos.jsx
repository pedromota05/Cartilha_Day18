import React, { useState, useEffect } from 'react';
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
    return (
        <>
        <div className="text-with-toc">
            <div className="text-content">
                {lista.map(cap => (
                    <div key={cap.id} className="bd-content ps-lg-2">
                        {activeTitle === cap.id && (
                            <h1 id={`capitulo_${cap.id}`}>{cap.attributes.title}</h1>
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
        </>
    );
};

export default TextCapitulos;