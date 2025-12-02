document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // DADOS DE CONFIGURAÇÃO GLOBAL (UNIFICADO)
    // --------------------------------------------------------------------------
    const WHATSAPP_NUMBER = '62993901617';
    // Mensagem de rastreamento única para testes (brazillian miracle)
    const WHATSAPP_MESSAGE_BASE = 'Olá! Sou um cliente do Goiás Fight e tenho interesse no item/evento. Referência: Brazillian Miracle.';

    // --------------------------------------------------------------------------
    // DADOS DE SIMULAÇÃO (Conteúdo Ampliado)
    // --------------------------------------------------------------------------
    const eventos = [
        // --- 1. DISPUTAS DE CINTURÃO (Cards de Destaque) ---
        { 
            type: 'belt', 
            id: 'belt-m', 
            titulo: 'Cinturão Masculino', 
            data: '22 DEZEMBRO, 19:00', 
            local: 'Ginásio do Centro',
            fighter1: { nome: 'BRUTUS', img: 'brutus-masculino.jpg' }, 
            fighter2: { nome: 'MENEZINHO', img: 'menezinho-masculino.jpg' }, 
            categoria: 'masculino',
            descricao: 'A guerra dos pesados! Brutus tenta manter o título contra o desafiante Menezinho. Não pisque!'
        },
        { 
            type: 'belt', 
            id: 'belt-f', 
            titulo: 'Cinturão Feminino', 
            data: '22 DEZEMBRO, 19:00', 
            local: 'Ginásio do Centro',
            fighter1: { nome: 'KETLEN', img: 'ketlen-feminina.jpg' }, 
            fighter2: { nome: 'BEATRIZ', img: 'beatriz-feminina.jpg' }, 
            categoria: 'feminino',
            descricao: 'Pela glória do Peso-Galo! Ketlen e Beatriz farão a melhor luta feminina do ano.'
        },
        // --- 2. CARDS SECUNDÁRIOS (Lutas Normais) ---
        {
            type: 'secondary',
            id: 'co-main',
            titulo: 'Co-Main Event: Peso Médio',
            data: '22 DEZEMBRO',
            local: 'Ginásio do Centro',
            img: 'luta-media-co-main.jpg',
            luta: 'Ferreira (GO) vs. Santtos (DF)',
            descricao: 'Um duelo regional que promete nocautes.'
        },
        {
            type: 'secondary',
            id: 'middle',
            titulo: 'Card Principal: Peso Leve',
            data: '22 DEZEMBRO',
            local: 'Ginásio do Centro',
            img: 'luta-media-principal.jpg',
            luta: 'Silas (GO) vs. Rômulo (SP)',
            descricao: 'Os melhores strikers se enfrentam na luta mais técnica do evento.'
        },
    ];

    const produtos = [
        { id: 101, nome: 'Luva Pro-Series (16oz)', preco: 'R$ 290,00', img: 'produto-luva-pro.jpg' },
        { id: 102, nome: 'Caneleira Elite Fight', preco: 'R$ 180,00', img: 'produto-caneleira-elite.jpg' },
        { id: 103, nome: 'Kit Bandagem + Bucal', preco: 'R$ 45,00', img: 'produto-bandagem-kit.jpg' },
    ];
    
    const portfolio = [
        { id: 201, titulo: 'UFG Open Fight', data: 'Outubro 2024', promotor: 'UFG Esportes', img: 'portfolio-ufg-open.jpg', metrica: 'Mais de 1500 Espectadores' },
        { id: 202, titulo: 'GYN Challenge X', data: 'Setembro 2024', promotor: 'GYN Prod.', img: 'portfolio-gyn-challenge.jpg', metrica: 'Patrocínios Fechados: 100%' },
    ];


    // --------------------------------------------------------------------------
    // 1. FUNÇÃO UTILITÁRIA: CRIAÇÃO DO LINK WHATSAPP
    // --------------------------------------------------------------------------
    function createWhatsappLink(number, customMessage = '') {
        const fullMessage = customMessage ? `${customMessage} - ${WHATSAPP_MESSAGE_BASE}` : WHATSAPP_MESSAGE_BASE;
        return `https://wa.me/55${number}?text=${encodeURIComponent(fullMessage)}`;
    }

    // --------------------------------------------------------------------------
    // 2. FUNÇÃO: RENDERIZAÇÃO DE EVENTOS E HERO
    // --------------------------------------------------------------------------
    function renderEventos() {
        const proximosContainer = document.getElementById('proximos-eventos');
        proximosContainer.innerHTML = ''; 

        // Separar eventos por tipo
        const beltEvents = eventos.filter(e => e.type === 'belt');
        const secondaryEvents = eventos.filter(e => e.type === 'secondary');
        
        // --- A. Configura a Seção HERO com o primeiro Card de Cinturão ---
        const eventoHero = beltEvents[0]; 
        if (eventoHero) {
            document.getElementById('evento-title').textContent = `${eventoHero.titulo}: ${eventoHero.fighter1.nome} vs ${eventoHero.fighter2.nome}`;
            document.getElementById('evento-data').textContent = `${eventoHero.data} | ${eventoHero.local}`;
            
            const heroMessage = `Quero garantir meu ingresso para a luta principal: ${eventoHero.titulo}.`;
            document.getElementById('cta-whatsapp-hero').href = createWhatsappLink(WHATSAPP_NUMBER, heroMessage);
        }

        // --- B. Renderiza os Cards de Destaque (Cinturão) ---
        beltEvents.forEach(evento => {
            const card = document.createElement('article');
            card.className = `main-card-destaque ${evento.categoria}`;
            
            const eventMessage = `Quero informações sobre a disputa de ${evento.titulo} (${evento.fighter1.nome} vs ${evento.fighter2.nome}).`;
            const eventLink = createWhatsappLink(WHATSAPP_NUMBER, eventMessage);

            card.innerHTML = `
                <div class="fighter-image">
                    <img src="img/${evento.fighter1.img}" alt="Lutador ${evento.fighter1.nome}" title="${evento.fighter1.nome}">
                    <div class="name-tag">${evento.fighter1.nome}</div>
                </div>
                
                <div class="main-card-details">
                    <h3>${evento.titulo}</h3>
                    <p class="belt-title">VALENDO O CINTURÃO</p>
                    <p>${evento.descricao}</p>
                    <p>DATA: ${evento.data} | LOCAL: ${evento.local}</p>
                    <a href="${eventLink}" class="cta-button" target="_blank">
                        GARANTIR ACESSO (WHATSAPP)
                    </a>
                </div>
                
                <div class="fighter-image">
                    <img src="img/${evento.fighter2.img}" alt="Lutador ${evento.fighter2.nome}" title="${evento.fighter2.nome}">
                    <div class="name-tag">${evento.fighter2.nome}</div>
                </div>
            `;
            proximosContainer.appendChild(card);
        });

        // --- C. Renderiza os Cards Secundários ---
        if (secondaryEvents.length > 0) {
            const secondaryGrid = document.createElement('div');
            secondaryGrid.className = 'secondary-cards-grid';
            
            secondaryEvents.forEach(evento => {
                const card = document.createElement('article');
                card.className = 'event-card';
                
                const eventMessage = `Quero informações sobre a luta: ${evento.luta}, no evento ${evento.titulo}.`;
                const eventLink = createWhatsappLink(WHATSAPP_NUMBER, eventMessage);

                card.innerHTML = `
                    <img src="img/${evento.img}" alt="Foto da luta ${evento.luta}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${evento.titulo}</h3>
                        <p class="card-detail">🥊 Luta: ${evento.luta}</p>
                        <p class="card-detail">📅 ${evento.data} | ${evento.local}</p>
                        <p class="card-detail">${evento.descricao}</p>
                        <a href="${eventLink}" class="card-cta" target="_blank">
                            DETALHES E INGRESSOS
                        </a>
                    </div>
                `;
                secondaryGrid.appendChild(card);
            });
            proximosContainer.appendChild(secondaryGrid);
        }
    }

    // --------------------------------------------------------------------------
    // 3. FUNÇÃO: RENDERIZAÇÃO DA LOJA (SHOPPING)
    // --------------------------------------------------------------------------
    function renderShopping() {
        const produtosContainer = document.getElementById('produtos-destaque');
        produtosContainer.innerHTML = '';

        produtos.forEach(produto => {
            const card = document.createElement('article');
            card.className = 'product-card';
            
            const productMessage = `Gostaria de fazer um pedido: ${produto.nome}. Preço: ${produto.preco}.`;
            const productLink = createWhatsappLink(WHATSAPP_NUMBER, productMessage);

            card.innerHTML = `
                <img src="img/${produto.img}" alt="Imagem do Produto ${produto.nome}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${produto.nome}</h3>
                    <p class="product-price">${produto.preco}</p>
                    <a href="${productLink}" class="card-cta" target="_blank">
                        PEDIR AGORA (WHATSAPP)
                    </a>
                </div>
            `;
            produtosContainer.appendChild(card);
        });
    }
    
    // --------------------------------------------------------------------------
    // 4. FUNÇÃO: RENDERIZAÇÃO DO PORTFÓLIO
    // --------------------------------------------------------------------------
    function renderPortfolio() {
        const portfolioContainer = document.getElementById('portfolio-galeria');
        portfolioContainer.innerHTML = '';

        portfolio.forEach(item => {
            const card = document.createElement('article');
            card.className = 'portfolio-card';
            
            card.innerHTML = `
                <img src="img/${item.img}" alt="Foto do Evento ${item.titulo}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${item.titulo}</h3>
                    <p class="card-detail">Promotor: ${item.promotor}</p>
                    <p class="card-detail">Data: ${item.data}</p>
                    <p class="parceria-selo">✅ ${item.metrica}</p>
                </div>
            `;
            portfolioContainer.appendChild(card);
        });
    }

    // --------------------------------------------------------------------------
    // 5. FUNÇÃO: INICIALIZAÇÃO E EVENTOS
    // --------------------------------------------------------------------------
    function init() {
        renderEventos();
        renderShopping();
        renderPortfolio();

        // Configura links de WhatsApp no Rodapé e Serviços
        document.getElementById('whatsapp-footer').href = createWhatsappLink(WHATSAPP_NUMBER, 'Gostaria de falar com o suporte.');
        document.getElementById('cta-servicos-whatsapp').href = createWhatsappLink(WHATSAPP_NUMBER, 'Gostaria de informações sobre como divulgar um Workshop ou Personal Fight.');

        // Menu Mobile Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.main-nav');
        if(menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
            });
        }
        
        // Atualiza o ano no rodapé
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    init();
});