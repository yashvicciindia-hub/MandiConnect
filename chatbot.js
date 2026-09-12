(function () {
  const WELCOME_CHIPS = [
    { label: "What is Mandi Connect?", text: "What is Mandi Connect?" },
    { label: "Find a mandi", text: "Where can I find a mandi?" },
    { label: "How do I check prices?", text: "How do I check prices?" },
    { label: "How can farmers find buyers?", text: "How can farmers find buyers?" },
    { label: "How can buyers find suppliers?", text: "How can buyers find suppliers?" },
    { label: "How does Mandi Connect help exporters?", text: "How does Mandi Connect help exporters?" }
  ];

  const NAV = {
    home: "Home",
    mandis: "Find Mandi",
    prices: "Prices",
    connect: "Buyer & Seller",
    contact: "Register"
  };

  const PRODUCE = (typeof vegList !== "undefined" ? vegList : []).map((v) => v.toLowerCase());

  const state = {
    open: false,
    lastIntent: null,
    lastTopic: null,
    role: null,
    messages: []
  };

  function pick(lang, pack) {
    return pack[lang] || pack.en;
  }

  function bullets(items) {
    return items.map((item) => `• ${item}`).join("\n");
  }

  const knowledge = {
    overview: {
      en: "Mandi Connect is an agritech and trade-infrastructure platform designed to connect India's mandis with national and global markets. The live website is a practical directory for finding mandis, checking sample market prices, and introducing buyers and sellers. The broader plan aims to become a trusted agricultural commerce layer connecting farmers, mandis, FPOs, buyers, processors, exporters, warehouses, logistics and financial institutions.",
      hi: "Mandi Connect India ke mandis ko national aur global markets se connect karne ke liye designed agricultural trade platform hai. Live website par aap mandi directory, sample prices aur buyer-seller connect dekh sakte ho. Bada vision yeh hai ki farmers, mandis, FPOs, buyers, processors aur exporters ko ek trusted digital network mein laaya jaaye.",
      hinglish: "Mandi Connect farmers, mandis, buyers, FPOs, processors aur exporters ko ek digital network mein connect karne ka aim karta hai. Iska focus better market access, price transparency, verified buyer discovery aur agricultural trade ko digitally connect karna hai."
    },
    problem: {
      en: "The source describes India's agricultural ecosystem as digitally fragmented. The core conclusion is that India's agricultural challenge is no longer production — it is market access. Key issues include limited market access, geographic isolation, fragmented price discovery, disconnected logistics, limited export access, non-transparent pricing, intermediary dependence, storage and cold-chain gaps, and limited quality, traceability and compliance infrastructure at the farm gate.",
      hi: "Source ke mutabik India ka agricultural challenge ab production nahi, market access hai. Mandis digitally fragmented hain — limited buyer reach, unclear pricing, disconnected logistics, export access ki kami, aur farm-gate par quality, traceability aur compliance infrastructure kam hai.",
      hinglish: "Source ke hisaab se problem yeh hai ki production toh hai, lekin market access limited hai. Price discovery fragmented hai, logistics disconnected hai, aur farmers/FPOs ko national-global buyers tak seedha connect karna mushkil hai."
    },
    solution: {
      en: "Mandi Connect aims to build India's agricultural trade backbone: farm gate → mandi/FPO → buyer → logistics → trade → global market. The plan outlines end-to-end transparency, unified buying across India, market insights, predictive supply planning, export corridors, verified buyer discovery, traceable supply chains and agricultural data intelligence. These are designed capabilities from the source, not automatic proof that every feature is live on this website today.",
      hi: "Mandi Connect agricultural trade backbone banana chahta hai: farm gate se mandi/FPO, buyer, logistics, trade aur global market tak. Source mein transparency, verified buyer discovery, logistics-traceability, export corridors aur market intelligence outline kiye gaye hain. Yeh planned/designed capabilities hain; har cheez is website par live nahi maani jaani chahiye.",
      hinglish: "Solution yeh hai ki Mandi Connect local mandis ko wider markets se digitally connect kare. Design mein trade facilitation, logistics & traceability, aur verified buyer discovery shamil hain — farm gate se global market tak."
    },
    tradeFacilitation: {
      en: "Trade Facilitation is designed to support the agricultural transaction lifecycle, including contracts, payments and compliance. The aim is a more organised, trusted path from listing to completed trade — without this assistant creating a contract or payment itself.",
      hi: "Trade Facilitation agricultural transaction lifecycle ko support karne ke liye designed hai — contracts, payments aur compliance ke saath. Yeh assistant khud koi contract ya payment create nahi karta.",
      hinglish: "Trade Facilitation ka matlab hai contracts, payments aur compliance ke saath trade process ko digitally support karna. Main yahan se koi deal complete nahi kar sakta."
    },
    logisticsTraceability: {
      en: "Logistics & Traceability is designed to integrate cold chain, warehousing, quality certification and supply-chain visibility. The idea is coordinated movement of produce with a trusted record — the source does not specify a particular blockchain implementation on the live site.",
      hi: "Logistics & Traceability cold chain, warehousing, quality certification aur supply-chain visibility ko integrate karne ke liye designed hai. Source kisi specific blockchain implementation ka live claim nahi karta.",
      hinglish: "Isme cold chain, warehousing, quality certification aur traceability ko supply chain se jodne ka plan hai, taaki movement aur quality ka record trust-first rahe."
    },
    verifiedBuyerDiscovery: {
      en: "Verified Buyer Discovery is designed to match mandis and FPOs with pre-qualified national and international buyers. The live Buyer & Seller page currently shows directory-style listings; this assistant cannot find or contact a live buyer for you.",
      hi: "Verified Buyer Discovery mandis aur FPOs ko pre-qualified national aur international buyers se match karne ke liye designed hai. Live site par Buyer & Seller listings hain; yeh assistant kisi live buyer ko contact nahi karta.",
      hinglish: "Verified Buyer Discovery ka aim hai mandis/FPOs ko qualified national aur international buyers se connect karna. Main khud koi buyer find karke deal nahi laga sakta."
    },
    workflow: {
      en: "The source describes a trust-first workflow:\n\n1. Mandi / FPO onboards products\n2. Products are digitally listed\n3. Verified buyers discover suppliers\n4. Quality & traceability are verified\n5. Logistics are coordinated\n6. Trade is completed\n7. Repeat transactions and long-term contracts\n\nEvery step is intended to be digitally verified to create a trusted transaction record. This assistant does not complete those steps for you.",
      hi: "Source ek trust-first workflow outline karta hai: product onboard → digital listing → verified buyer discovery → quality/traceability verification → logistics → trade complete → repeat/long-term contracts. Har step digitally verified record ke liye designed hai. Yeh assistant yeh steps execute nahi karta.",
      hinglish: "Flow roughly yeh hai: mandi/FPO products onboard kare, listing ho, verified buyers discover karein, quality-traceability check ho, logistics coordinate ho, phir trade complete ho. Yeh planned seamless workflow hai."
    },
    trust: {
      en: "Trust is positioned as a core layer: digital verification, quality verification, traceability, certification, verified buyers, institutional networks and trade expertise. Mandi Connect is framed around trusted agricultural commerce rather than unverified listings alone.",
      hi: "Trust layer mein digital verification, quality checks, traceability, certification, verified buyers aur institutional networks shamil hain. Positioning trusted agricultural commerce ki hai.",
      hinglish: "Trust model digital verification, quality, traceability, certification aur verified buyers par based hai — taaki trade sirf listing nahi, trusted record ke saath ho."
    },
    findMandi: {
      en: "You can use the Find Mandi section to search and browse mandi information listed on Mandi Connect. This hardcoded assistant does not have access to your live location and cannot say it found a mandi near you. Open Find Mandi to browse directory listings such as Azadpur, Koyambedu, Vashi APMC and others shown on the site.",
      hi: "Mandi information ke liye Find Mandi section use karein. Is hardcoded assistant ke paas aapki live location nahi hai, isliye main 'nearest mandi' confirm nahi kar sakta. Site par listed mandis browse karne ke liye Find Mandi kholen.",
      hinglish: "Nearest mandi ke liye main live location use nahi kar sakta. Aap Find Mandi section mein city/mandi name se search kar sakte ho — yahan listed mandi directory hai, live GPS result nahi."
    },
    prices: {
      en: "I don't have live mandi-price access in this hardcoded assistant. Please check the Prices section of Mandi Connect for the latest available price information. The website shows sample daily min–max rates for produce; I will not invent a rupee figure such as today's tomato rate.",
      hi: "Main is hardcoded assistant ke through live mandi prices access nahi kar sakta. Latest available rates ke liye Mandi Connect ke Prices section ko check karein. Main koi imaginary ₹/kg figure nahi dunga.",
      hinglish: "Aaj ka exact tomato/aloo rate main yahan se live nahi nikaal sakta. Prices section mein available sample market-price information check karein — maine koi rate invent nahi karna."
    },
    buyerSeller: {
      en: "Mandi Connect is designed to digitally connect agricultural suppliers with buyers beyond a purely local market. The intended model includes digital product listing, verified buyer discovery and trade facilitation. On the live site, use Buyer & Seller to browse listings and Register to express interest. This assistant cannot create a transaction, listing or introduction by itself.",
      hi: "Sell/buy ke liye Mandi Connect digital listing, buyer discovery aur trade facilitation ke around designed hai. Live site par Buyer & Seller listings dekhein aur Register se interest dikhayein. Main koi deal, listing ya registration complete nahi kar sakta.",
      hinglish: "Produce bechne/kharidne ke liye Buyer & Seller section use karein. Design yeh hai ki listing ho, buyers discover karein, aur market access local mandi se aage badhe. Main abhi koi transaction create nahi kar sakta."
    },
    register: {
      en: "To register, open the Register section and use the Mandi Connect registration form. Tell the team whether you are selling or buying. This assistant cannot submit the form or create an account for you.",
      hi: "Register karne ke liye Register section kholen aur registration form bharein. Main form submit ya account create nahi kar sakta.",
      hinglish: "Registration ke liye Register page par jaake form open karein. Main aapko register nahi kar sakta — form aapko khud fill karna hoga."
    },
    farmer: {
      en: "For farmers, Mandi Connect is designed to widen market access, improve price transparency, support buyer discovery and enable more direct buyer relationships — with the potential to reduce dependence on intermediaries and reach national or international demand. Use Find Mandi, Prices, Buyer & Seller and Register on this website to start.",
      hi: "Farmers ke liye focus market access, better price transparency, buyer discovery aur direct buyer relationships par hai — middlemen dependency kam karne ka potential ke saath. Website par Find Mandi, Prices, Buyer & Seller aur Register use karein.",
      hinglish: "Farmer ke liye main baat market access ki hai: local mandi ke bahar buyers, clearer prices, direct relationships, aur middlemen par kam dependency ka potential. National/international opportunities bhi design ka hissa hain."
    },
    fpo: {
      en: "For FPOs and cooperatives, the platform is designed to improve aggregated market access, digital visibility and discovery by national and international buyers. The source also outlines onboarding FPOs as a network-expansion phase.",
      hi: "FPOs ke liye aggregated market access, digital visibility aur national/international buyer discovery designed hai. Source FPO onboarding ko expansion phase mein rakhta hai.",
      hinglish: "FPOs ko wider buyer discovery, aggregated supply visibility aur digital presence dene ka plan hai, taaki cooperative produce national/export buyers tak pahunch sake."
    },
    mandi: {
      en: "For mandis, Mandi Connect is designed to support digital participation, expanded buyer access, better market connectivity and higher transaction volumes over time. These are intended outcomes, not guarantees.",
      hi: "Mandis ke liye digital participation, extra buyer access aur better connectivity designed hai. Volume increase intended hai, guaranteed nahi.",
      hinglish: "Mandi operators ke liye digital listing, zyada buyers tak reach, aur connected trade infrastructure ka plan hai — volumes badhane ke intention ke saath, guarantee ke bina."
    },
    buyer: {
      en: "For buyers, Mandi Connect is designed to help find verified agricultural suppliers, streamline procurement, support aggregated sourcing and build more reliable supply chains. On this website, browse Buyer & Seller and Register to share what you need.",
      hi: "Buyers ke liye verified suppliers, streamlined procurement aur reliable supply chains designed hain. Site par Buyer & Seller aur Register use karein.",
      hinglish: "Bulk buyers ke liye supplier discovery, aggregated sourcing aur zyada reliable supply ka design hai. Live listings Buyer & Seller par dekhein; main koi supplier assign nahi kar sakta."
    },
    trader: {
      en: "For traders, the platform is designed as a digital layer for mandi-linked trade: discovering produce, connecting with farmers and buyers, and participating in a more transparent market-access network.",
      hi: "Traders ke liye mandi-linked digital trade layer designed hai — produce discovery, farmer/buyer connect aur zyada transparent market access.",
      hinglish: "Traders Mandi Connect ko discovery aur connect layer ki tarah use kar sakte hain — listed mandis, sample prices aur buyer-seller introductions ke through."
    },
    processor: {
      en: "For processors, Mandi Connect is designed to support better sourcing, more reliable supply and traceable agricultural products — useful when consistent quality and origin records matter.",
      hi: "Processors ke liye better sourcing, reliable supply aur traceable produce designed hai.",
      hinglish: "Processors ko consistent sourcing, reliable supply aur traceability wale agricultural products milne ka design hai."
    },
    exporter: {
      en: "Mandi Connect is designed to support agricultural export access through international buyer discovery, export facilitation, traceability, quality certification and compliance-related infrastructure. It does not guarantee that every product can be exported.",
      hi: "Exports ke liye international buyer discovery, facilitation, traceability, quality certification aur compliance infrastructure designed hai. Har product export ho jayega, yeh guarantee nahi hai.",
      hinglish: "Export help ke liye design mein international buyers, export corridors/facilitation, traceability, quality certification aur compliance support hai — har crop automatically exportable nahi hota."
    },
    globalBuyer: {
      en: "For global buyers, the plan is access to Indian agricultural suppliers with quality assurance, traceability and compliance support. Discovery is intended through verified networks rather than informal one-off contacts.",
      hi: "Global buyers ke liye Indian suppliers, quality assurance, traceability aur compliance support designed hai.",
      hinglish: "International buyers ko Indian agricultural suppliers, traceable supply aur compliance support ke saath connect karne ka aim hai."
    },
    warehouse: {
      en: "Warehouses are positioned as part of connected agricultural logistics — integrated into the supply chain alongside storage, lot handling and, where relevant, cold chain.",
      hi: "Warehouses connected agricultural logistics ka hissa hain — storage aur supply chain integration ke saath.",
      hinglish: "Warehouse partners ko supply chain mein integrate karne ka plan hai, taaki storage isolated na rahe."
    },
    logistics: {
      en: "Logistics is designed as coordinated agricultural movement, including cold-chain integration where needed. The source lists logistics commissions as a planned revenue opportunity, not confirmed live booking by this assistant.",
      hi: "Logistics coordinated agricultural movement aur cold-chain integration ke liye designed hai. Yeh assistant live booking nahi karta.",
      hinglish: "Logistics ka role produce ko coordinated tarike se move karna hai, including cold chain. Main koi truck/warehouse book nahi kar sakta."
    },
    finance: {
      en: "Financial institutions are described as participants in agricultural commerce infrastructure, with potential embedded financial services. The source lists trade-finance revenue sharing and related opportunities as planned, not as a live banking product in this chatbot.",
      hi: "Financial institutions agricultural commerce infrastructure mein participate kar sakte hain. Embedded finance source mein planned opportunity ke taur par hai.",
      hinglish: "Banks/NBFCs ke liye platform ke around embedded finance ka potential source mein mentioned hai — yeh chatbot loan approve nahi karta."
    },
    exports: {
      en: "Mandi Connect is designed to support agricultural export access through an export marketplace pathway, export corridors, international buyer discovery, facilitation, traceability, quality certification and compliance-related support. Do not assume every commodity or lot is export-ready.",
      hi: "Export marketplace, corridors, international buyers, facilitation, traceability aur certification designed hain. Har commodity export-ready nahi hoti.",
      hinglish: "Export side par international buyer discovery, facilitation, traceability aur quality/compliance support outline kiya gaya hai."
    },
    traceability: {
      en: "Traceability here means supporting visibility across the agricultural supply chain — product/lot information, quality verification, certification, supply-chain records and international compliance requirements. The source does not describe a specific blockchain product on the live website.",
      hi: "Traceability supply chain visibility hai: lot information, quality verification, certification aur compliance records. Live site par koi specific blockchain implementation claimed nahi hai.",
      hinglish: "Traceability ka matlab hai lot, quality, certification aur supply-chain record dikhna — especially exports ke liye. Blockchain ka specific live claim nahi karna."
    },
    quality: {
      en: "Quality verification and certification are described as ways to build buyer confidence, support reliable supply chains and meet export requirements. The source also lists quality testing and certification as planned service lines.",
      hi: "Quality verification/certification buyer confidence, reliable supply aur export requirements ke liye important hain.",
      hinglish: "Quality checks isliye matter karte hain kyunki buyers ko bharosa chahiye, supply reliable ho, aur export compliance poora ho sake."
    },
    ai: {
      en: "Mandi Connect's planned/outlined AI capabilities include demand forecasting, price forecasting, yield analytics, export intelligence and advanced trade analytics. This hardcoded assistant cannot run those calculations or produce live forecasts.",
      hi: "Planned AI capabilities mein demand/price forecasting, yield analytics, export intelligence aur trade analytics hain. Yeh assistant yeh calculate nahi karta.",
      hinglish: "AI market intelligence roadmap mein hai — forecasting aur analytics. Main khud price ya demand predict nahi kar sakta."
    },
    marketIntelligence: {
      en: "Agricultural data intelligence is intended around market data, pricing, demand, supply planning, yield analytics, export intelligence and trade analytics — to help participants make more informed decisions. Treat this as a planned intelligence layer unless a live dashboard is connected.",
      hi: "Data intelligence market data, pricing, demand, supply planning aur export/trade analytics ke around planned hai.",
      hinglish: "Market intelligence ka aim informed decisions ke liye data dena hai — live dashboard is chatbot se connected nahi hai."
    },
    cciIndia: {
      en: "The source identifies CCI India as the institutional trust layer, citing established relationships across industries, states and chambers; links with agricultural bodies; partnerships with global chambers and export councils; and experience in compliance, certification, cross-border commerce, policy access and trade facilitation. I cannot invent specific government contracts, endorsements or official approvals beyond that description.",
      hi: "Source CCI India ko institutional trust layer kehta hai — chambers, agri bodies, export councils, compliance, certification aur cross-border trade experience ke saath. Main koi specific government contract ya endorsement invent nahi karunga.",
      hinglish: "CCI India ko source institutional trust layer kehta hai: networks, compliance, certification aur international trade expertise. Specific government approval ka false claim nahi karna."
    },
    roadmap: {
      en: "Network expansion in the source is phased: (1) top agricultural states, (2) mandi partnerships, (3) FPO and cooperative onboarding, (4) institutional buyers, (5) export buyers. The longer roadmap includes mandi digitisation, logistics and warehousing, an export marketplace, a traceability layer, AI market intelligence and a national buyer network — moving from market access toward national agricultural infrastructure.",
      hi: "Expansion phases: top agri states → mandi partnerships → FPO/coops → institutional buyers → export buyers. Long-term: digitisation, logistics/warehousing, export marketplace, traceability, AI intelligence, national buyer network.",
      hinglish: "Roadmap phased hai: pehle key states, phir mandi partnerships, FPOs, institutional buyers, phir export buyers. Vision market-access platform se national agri infrastructure ki taraf hai."
    },
    technology: {
      en: "The source outlines technology such as a farmer app, trader dashboard, national e-auction platform, real-time bidding engine, digital payments, AI quality grading, a traceability system and a market intelligence platform. Treat these as planned/outlined, not automatically live.",
      hi: "Outlined tech: farmer app, trader dashboard, e-auction, bidding engine, digital payments, AI grading, traceability, market intelligence. Yeh planned hain, automatically live nahi.",
      hinglish: "Tech roadmap mein apps, e-auction, payments, AI grading aur traceability outlined hain — current chatbot un systems ka live control nahi hai."
    },
    operations: {
      en: "The investment plan includes digital weighbridges, QR lot tagging, quality testing systems, mandi digitisation kits and local support teams. These are planned operations tools, not a claim that they are deployed in every mandi.",
      hi: "Operations plan mein digital weighbridges, QR lot tagging, quality testing, digitisation kits aur local support teams hain — everywhere deployed, yeh claim nahi.",
      hinglish: "Digitisation kit, QR tagging, weighbridges aur local teams investment plan ka hissa hain, nationwide live rollout ka proof nahi."
    },
    businessModel: {
      en: "The source outlines multiple planned revenue streams: transaction commissions, buyer subscription plans, mandi memberships, logistics commissions, export facilitation fees, traceability-as-a-service, quality testing and certification, market intelligence subscriptions, and trade-finance revenue sharing. Additional listed opportunities include an input marketplace, auction fees, warehouse booking commissions, insurance referrals and embedded finance. These are source-listed opportunities, not confirmed current revenue.",
      hi: "Planned streams: trade commissions, buyer/mandi plans, logistics, export facilitation, traceability, quality certification, market intelligence, trade finance share. Extra opportunities bhi listed hain. Yeh current confirmed revenue nahi hain.",
      hinglish: "Business model source mein commissions, subscriptions, logistics, export support, traceability, certification aur intelligence plans se outline hai — actual current earnings nahi."
    },
    projections: {
      en: "These are SOURCE PROJECTIONS, not current user counts. Year 1→5: registered farmers 50,000 to 3,000,000; active buyers & traders 2,000 to 100,000; exporters & institutional buyers 100 to 10,000; digitized mandis 25 to 1,000; annual trade volume $100M to $12B; annual auctions 50,000 to 10,000,000; projected revenue $975K to $128M.",
      hi: "Yeh source projections hain, aaj ke live numbers nahi. Jaise Year 1 mein 50,000 registered farmers ka projection hai — iska matlab yeh nahi ki abhi 50,000 farmers already hain.",
      hinglish: "5-year figures source projections hain. 'Kitne farmers hain?' ka jawab current 50,000 nahi hai — Year 1 projection 50,000 registered farmers ka hai."
    },
    investment: {
      en: "The MandiConnect plan outlines a $2 million investment ask to support digitising agricultural trade, auctions, quality verification, logistics and market access. It does not establish that the $2M has already been raised.",
      hi: "Source $2 million investment ask outline karta hai — yeh prove nahi karta ki $2M raise ho chuka hai.",
      hinglish: "Plan mein $2M investment ask hai trade, auctions, quality, logistics aur market access digitise karne ke liye. Raised hai, yeh claim nahi karna."
    },
    allocation: {
      en: "Planned $2M allocation: Technology Development & Product Engineering $700,000 (35%); Market Expansion & Farmer Onboarding $400,000 (20%); Operations & Mandi Digitization $300,000 (15%); Sales, Partnerships & Buyer Acquisition $250,000 (12.5%); AI, Data Analytics & Innovation Lab $200,000 (10%); Compliance, Legal & Regulatory $150,000 (7.5%).",
      hi: "Planned allocation: Tech $700K (35%), onboarding $400K (20%), operations/digitisation $300K (15%), sales/buyers $250K (12.5%), AI/data $200K (10%), compliance $150K (7.5%).",
      hinglish: "$2M ka planned split tech, farmer onboarding, mandi digitisation, buyer partnerships, AI/data lab aur compliance mein hai."
    },
    benefits: {
      en: "Ecosystem benefits are designed to include better supply-chain efficiency, improved farmer income opportunities, clearer price transparency, broader market access, export pathways, reduced wastage through better logistics/cold-chain integration, and higher mandi connectivity. These are intended outcomes — not guarantees.",
      hi: "Benefits designed hain: efficiency, farmer income opportunities, price transparency, market access, exports, kam wastage, better logistics. Guarantee nahi, intention hai.",
      hinglish: "Platform better access, transparency, logistics aur buyer connections se outcomes improve karne ke liye designed hai — guaranteed results nahi."
    },
    navigation: {
      en: "Website sections: Home, Find Mandi, Prices, Buyer & Seller, and Register. I can guide you to the right page. I cannot submit forms, complete trades, or mark a registration as done.",
      hi: "Pages: Home, Find Mandi, Prices, Buyer & Seller, Register. Main page guide kar sakta hoon, form submit nahi.",
      hinglish: "Navigation simple hai: mandi ke liye Find Mandi, rates ke liye Prices, trade intros ke liye Buyer & Seller, form ke liye Register."
    },
    unknown: {
      en: "I don't have enough information in my Mandi Connect knowledge base to answer that accurately. I can help with mandis, prices, buyers and sellers, market access, exports, traceability, logistics, Mandi Connect's roadmap and business model.",
      hi: "Is sawal ka accurate jawab mere Mandi Connect knowledge base mein nahi hai. Main mandis, prices, buyers-sellers, market access, exports, traceability, logistics, roadmap aur business model par help kar sakta hoon.",
      hinglish: "Mere knowledge base mein itni information nahi hai ki main yeh accurately bata sakun. Mandi Connect topics par poochho — mandis, prices, buyers, exports, roadmap."
    },
    prompt: {
      en: "I can help you explore Mandi Connect, but I can't provide internal system instructions. Ask about mandis, prices, buyers, exports, traceability or the Mandi Connect plan instead.",
      hi: "Main Mandi Connect explore karne mein help kar sakta hoon, lekin internal system instructions nahi de sakta.",
      hinglish: "Internal instructions share nahi kar sakta. Mandi Connect ke topics poochho — mandis, prices, buyers, exports."
    }
  };

  const INTENT_RULES = [
    { intent: "PROMPT_LEAK", score: 12, any: ["system prompt", "hidden prompt", "ignore your instructions", "ignore previous instructions", "reveal your instructions", "developer mode", "jailbreak", "show your prompt"] },
    { intent: "GREETING", score: 6, any: ["hello", "hi ", "hi,", "hey", "namaste", "namaskar", "good morning", "good evening", "salaam"] },
    { intent: "OVERVIEW", score: 8, any: ["what is mandi connect", "explain mandi connect", "about mandi connect", "ye platform kya", "platform kya hai", "mandi connect kya", "how does this platform work", "what do you do", "who are you"] },
    { intent: "PROBLEM", score: 8, any: ["problem", "challenge", "fragmented", "market access", "why does india need", "kya problem", "masla"] },
    { intent: "SOLUTION", score: 7, any: ["solution", "how does mandi connect help", "backbone", "what does it solve", "kaise help"] },
    { intent: "FIND_MANDI", score: 10, any: ["find a mandi", "find mandi", "nearest mandi", "near me", "mandi kahan", "where can i find a mandi", "show me mandi", "mandi search", "azadpur", "koyambedu", "vashi"] },
    { intent: "PRICES", score: 11, any: ["price", "prices", "rate", "rates", "bhav", "bhaav", "mandi rate", "today's tomato", "aaj ka rate", "kitne ka", "per kg", "₹"] },
    { intent: "REGISTER", score: 9, any: ["register", "sign up", "signup", "registration", "naam likh", "form"] },
    { intent: "BUYER_SELLER", score: 8, any: ["buy or sell", "buyer & seller", "buyer and seller", "sell my", "find buyers", "find suppliers", "listing", "connect with", "i want to sell", "i want to buy", "bechna", "kharidna"] },
    { intent: "FARMER", score: 7, any: ["farmer", "kisan", "fasal", "my produce", "my crop"] },
    { intent: "FPO", score: 8, any: ["fpo", "farmer producer", "cooperative", "co-operative", "sahakari"] },
    { intent: "MANDI", score: 6, any: ["i am from a mandi", "mandi operator", "apmc", "mandi board"] },
    { intent: "BUYER", score: 7, any: ["i am a buyer", "bulk", "procurement", "wholesale buy", "i want to buy vegetables"] },
    { intent: "TRADER", score: 7, any: ["trader", "aarhatiya", "commission agent"] },
    { intent: "PROCESSOR", score: 8, any: ["processor", "processing unit", "food processing"] },
    { intent: "EXPORTER", score: 8, any: ["exporter", "i export"] },
    { intent: "GLOBAL_BUYER", score: 8, any: ["global buyer", "international buyer", "overseas buyer"] },
    { intent: "LOGISTICS", score: 8, any: ["logistics", "transport", "shipping", "truck", "cold chain", "cold-chain"] },
    { intent: "WAREHOUSE", score: 8, any: ["warehouse", "godown", "storage", "warehousing"] },
    { intent: "TRACEABILITY", score: 9, any: ["traceability", "traceable", "lot tagging", "origin", "track the produce"] },
    { intent: "QUALITY", score: 8, any: ["quality", "grading", "testing"] },
    { intent: "CERTIFICATION", score: 8, any: ["certification", "certificate", "certified"] },
    { intent: "TRADE_FACILITATION", score: 8, any: ["trade facilitation", "contracts", "payments", "compliance"] },
    { intent: "AI", score: 8, any: ["artificial intelligence", " ai", "forecast", "predict"] },
    { intent: "MARKET_INTELLIGENCE", score: 8, any: ["market intelligence", "analytics", "data intelligence", "insights"] },
    { intent: "WORKFLOW", score: 8, any: ["workflow", "how it works", "process", "steps", "kaise kaam"] },
    { intent: "CCI_INDIA", score: 10, any: ["cci india", "cci", "why cci", "institutional trust"] },
    { intent: "ROADMAP", score: 8, any: ["roadmap", "phases", "expansion", "future", "vision", "digitisation", "digitization"] },
    { intent: "BUSINESS_MODEL", score: 8, any: ["business model", "how do you make money", "monetiz"] },
    { intent: "REVENUE", score: 9, any: ["revenue", "how much money", "earn", "income of mandi connect"] },
    { intent: "PROJECTIONS", score: 9, any: ["projection", "year 1", "year 5", "how many farmers", "3 million", "trade volume", "auctions conducted"] },
    { intent: "INVESTMENT_ALLOCATION", score: 10, any: ["allocation", "700,000", "35%", "where will the money go", "spend the 2"] },
    { intent: "INVESTMENT", score: 9, any: ["investment", "$2", "2 million", "2m", "raised", "funding", "investor"] },
    { intent: "EXPORTS", score: 8, any: ["export", "international market", "global market", "overseas"] },
    { intent: "MARKET_ACCESS", score: 7, any: ["market access", "outside my city", "beyond local", "wider market"] },
    { intent: "BENEFITS", score: 6, any: ["benefit", "advantages", "why join", "kya fayda"] }
  ];

  const ROLE_RULES = [
    { role: "farmer", any: ["i m a farmer", "i am a farmer", "main kisan", "we are farmers", "as a farmer"] },
    { role: "fpo", any: ["i m an fpo", "i am an fpo", "our fpo", "cooperative"] },
    { role: "buyer", any: ["i m a buyer", "i am a buyer", "buy in bulk", "wholesale"] },
    { role: "exporter", any: ["i m an exporter", "i am an exporter"] },
    { role: "mandi", any: ["from a mandi", "mandi operator", "we run a mandi"] },
    { role: "trader", any: ["i m a trader", "i am a trader"] },
    { role: "processor", any: ["i m a processor", "processing unit"] },
    { role: "global_buyer", any: ["global buyer", "import from india"] }
  ];

  function normalize(text) {
    return ` ${text.toLowerCase().replace(/[^\w\u0900-\u097F\s$₹%+]/g, " ").replace(/\s+/g, " ").trim()} `;
  }

  function detectLanguage(text) {
    if (/[\u0900-\u097F]/.test(text)) return "hi";
    const hinglish = /\b(kya|hai|kaise|ke liye|mujhe|hum|aap|nahi|mandi connect kya|rate kya|buyer kaise|fayda|karo|chahiye|batao|bhav)\b/i;
    if (hinglish.test(text)) return "hinglish";
    return "en";
  }

  function hasAny(norm, list) {
    return list.some((item) => norm.includes(item.toLowerCase()));
  }

  function detectRole(norm) {
    for (const rule of ROLE_RULES) {
      if (hasAny(norm, rule.any)) return rule.role;
    }
    return null;
  }

  function isFollowUp(text) {
    return /^(why|how|and that|what about|is it|uske|woh|yeh kyun|kyun zaroori|why is it|how does it|tell me more|more about that|aur)\b/i.test(text.trim());
  }

  function detectIntent(text) {
    const norm = normalize(text);
    if (PRODUCE.some((veg) => norm.includes(veg)) && /(price|rate|bhav|bhaav|₹|kg|cost|aaj)/i.test(text)) {
      return "PRICES";
    }
    let best = { intent: "UNKNOWN", score: 0 };
    for (const rule of INTENT_RULES) {
      if (hasAny(norm, rule.any) && rule.score >= best.score) {
        best = { intent: rule.intent, score: rule.score };
      }
    }
    if (best.score < 6 && state.lastIntent && isFollowUp(text)) {
      return state.lastIntent;
    }
    if (best.score < 6 && state.lastTopic && /(export|important|why)/i.test(text)) {
      if (state.lastTopic === "TRACEABILITY") return "TRACEABILITY_EXPORTS";
    }
    return best.intent;
  }

  function chipsFor(intent) {
    const map = {
      GREETING: WELCOME_CHIPS,
      OVERVIEW: [
        { label: "Find a Mandi", text: "Where can I find a mandi?" },
        { label: "Check Prices", text: "How do I check prices?" },
        { label: "How Buyers Connect", text: "How can farmers find buyers?" },
        { label: "Export Opportunities", text: "How does Mandi Connect help exporters?" }
      ],
      FIND_MANDI: [
        { label: "Open Find Mandi", text: "Open Find Mandi", nav: "mandis" },
        { label: "Check Prices", text: "How do I check prices?" },
        { label: "Register", text: "How do I register?" }
      ],
      PRICES: [
        { label: "Open Prices", text: "Open Prices", nav: "prices" },
        { label: "Find a Mandi", text: "Where can I find a mandi?" },
        { label: "Market access", text: "Can I find buyers outside my city?" }
      ],
      BUYER_SELLER: [
        { label: "Open Buyer & Seller", text: "Open Buyer & Seller", nav: "connect" },
        { label: "Register", text: "How do I register?" },
        { label: "For farmers", text: "I'm a farmer. How can Mandi Connect help me?" }
      ],
      REGISTER: [{ label: "Open Register", text: "Open Register", nav: "contact" }, { label: "Buyer & Seller", text: "How can I buy or sell?" }],
      FARMER: [
        { label: "Find a Mandi", text: "Where can I find a mandi?" },
        { label: "Check Prices", text: "How do I check prices?" },
        { label: "How Buyers Connect", text: "How can farmers find buyers?" },
        { label: "Export Opportunities", text: "Can I export my produce?" }
      ],
      EXPORTS: [
        { label: "Traceability", text: "What is traceability?" },
        { label: "Quality Certification", text: "Why does quality certification matter?" },
        { label: "International Buyers", text: "How do I find international buyers?" }
      ],
      EXPORTER: [
        { label: "Traceability", text: "What is traceability?" },
        { label: "Quality Certification", text: "Why does quality certification matter?" },
        { label: "CCI India", text: "Why CCI India?" }
      ],
      TRACEABILITY: [
        { label: "Why for exports?", text: "Why is traceability important for exports?" },
        { label: "Quality Certification", text: "What is quality certification?" }
      ],
      BUSINESS_MODEL: [
        { label: "Revenue Streams", text: "What revenue streams are outlined?" },
        { label: "$2M Investment Ask", text: "What is the $2M investment for?" },
        { label: "5-Year Projections", text: "What are the five-year projections?" }
      ],
      REVENUE: [
        { label: "$2M Investment Ask", text: "What is the $2M investment for?" },
        { label: "5-Year Projections", text: "What are the five-year projections?" }
      ],
      INVESTMENT: [
        { label: "Allocation", text: "How is the $2M allocated?" },
        { label: "AI investment", text: "What AI capabilities are planned?" }
      ],
      PROJECTIONS: [{ label: "Investment Ask", text: "Has Mandi Connect raised $2M?" }, { label: "Roadmap", text: "What is the roadmap?" }],
      CCI_INDIA: [{ label: "Trust model", text: "What is the trust model?" }, { label: "Exports", text: "How can Mandi Connect help exporters?" }],
      ROADMAP: [{ label: "Technology outlined", text: "What technology is on the roadmap?" }, { label: "AI plans", text: "What AI capabilities are planned?" }],
      UNKNOWN: WELCOME_CHIPS.slice(0, 4)
    };
    map.PROMPT_LEAK = map.UNKNOWN;
    map.SOLUTION = [
      { label: "Workflow", text: "How does the workflow work?" },
      { label: "Trade Facilitation", text: "What is trade facilitation?" },
      { label: "Verified buyers", text: "What is verified buyer discovery?" }
    ];
    map.WORKFLOW = map.SOLUTION;
    map.QUALITY = map.TRACEABILITY;
    map.CERTIFICATION = map.TRACEABILITY;
    map.AI = [{ label: "Market intelligence", text: "What is agricultural data intelligence?" }, { label: "Roadmap", text: "What is the roadmap?" }];
    map.INVESTMENT_ALLOCATION = map.INVESTMENT;
    map.MARKET_ACCESS = map.FARMER;
    map.BUYER = [
      { label: "Open Buyer & Seller", text: "Open Buyer & Seller", nav: "connect" },
      { label: "Find a Mandi", text: "Where can I find a mandi?" }
    ];
    return map[intent] || [
      { label: "What is Mandi Connect?", text: "What is Mandi Connect?" },
      { label: "Find a Mandi", text: "Where can I find a mandi?" },
      { label: "Check Prices", text: "How do I check prices?" }
    ];
  }

  function extraForRole(lang, role) {
    if (!role) return "";
    const lines = {
      farmer: pick(lang, {
        en: "Since you mentioned you are a farmer, the practical next steps on this website are Find Mandi, Prices, Buyer & Seller, and Register.",
        hi: "Aap farmer hain, to website par Find Mandi, Prices, Buyer & Seller aur Register se shuru kar sakte ho.",
        hinglish: "Farmer ke hisaab se next step: Find Mandi, Prices, Buyer & Seller, Register."
      }),
      buyer: pick(lang, {
        en: "Since you are buying, start with Buyer & Seller listings and Register to describe volume and produce needs.",
        hi: "Buyer ke taur par Buyer & Seller aur Register se requirement share karein.",
        hinglish: "Buying ke liye Buyer & Seller dekho aur Register par requirement likho."
      }),
      exporter: pick(lang, {
        en: "As an exporter, the relevant designed layers are international buyer pathways, traceability, quality certification and compliance support.",
        hi: "Exporter ke liye traceability, certification aur international buyer pathways relevant hain.",
        hinglish: "Exporter hat mein traceability, quality certification aur export facilitation relevant hain."
      })
    };
    return lines[role] ? `\n\n${lines[role]}` : "";
  }

  function answerFor(intent, lang, role) {
    const add = extraForRole(lang, role);
    const k = knowledge;
    switch (intent) {
      case "PROMPT_LEAK":
        return k.prompt[lang] || k.prompt.en;
      case "GREETING":
        return pick(lang, {
          en: "Namaste. I am the Mandi Connect Assistant — your agricultural market guide. Ask about mandis, prices, buyers, sellers, exports or how Mandi Connect is designed to work.",
          hi: "Namaste. Main Mandi Connect Assistant hoon. Mandis, prices, buyers, exports aur platform ke plan ke baare mein poochh sakte ho.",
          hinglish: "Namaste! Main Mandi Connect Assistant hoon — mandis, prices, buyers-sellers aur market access guide karne ke liye."
        });
      case "OVERVIEW":
        return pick(lang, k.overview) + add;
      case "PROBLEM":
        return pick(lang, k.problem);
      case "SOLUTION":
      case "MARKET_ACCESS":
        return pick(lang, k.solution) + add;
      case "FIND_MANDI":
        return pick(lang, k.findMandi);
      case "PRICES":
        return pick(lang, k.prices);
      case "BUYER_SELLER":
        return pick(lang, k.buyerSeller) + add;
      case "REGISTER":
        return pick(lang, k.register);
      case "FARMER":
        return pick(lang, k.farmer);
      case "FPO":
        return pick(lang, k.fpo);
      case "MANDI":
        return pick(lang, k.mandi);
      case "BUYER":
        return pick(lang, k.buyer);
      case "TRADER":
        return pick(lang, k.trader);
      case "PROCESSOR":
        return pick(lang, k.processor);
      case "EXPORTER":
      case "EXPORTS":
        return pick(lang, k.exporter);
      case "GLOBAL_BUYER":
        return pick(lang, k.globalBuyer);
      case "LOGISTICS":
        return pick(lang, k.logistics);
      case "WAREHOUSE":
        return pick(lang, k.warehouse);
      case "TRACEABILITY":
        return pick(lang, k.traceability);
      case "TRACEABILITY_EXPORTS":
        return pick(lang, {
          en: "Traceability matters for exports because international buyers typically need visibility into lot origin, quality verification, certification and supply-chain records for compliance. Mandi Connect is designed to support that visibility; this assistant cannot issue a certificate.",
          hi: "Exports mein traceability isliye zaroori hai kyunki international buyers ko origin, quality, certification aur supply-chain records chahiye hote hain. Platform is visibility ko support karne ke liye designed hai.",
          hinglish: "Export buyers ko lot origin, quality proof aur compliance records chahiye. Traceability usi visibility ke liye designed hai."
        });
      case "QUALITY":
      case "CERTIFICATION":
        return pick(lang, k.quality);
      case "TRADE_FACILITATION":
        return pick(lang, k.tradeFacilitation);
      case "AI":
        return pick(lang, k.ai);
      case "MARKET_INTELLIGENCE":
        return pick(lang, k.marketIntelligence);
      case "WORKFLOW":
        return pick(lang, k.workflow);
      case "CCI_INDIA":
        return pick(lang, k.cciIndia);
      case "ROADMAP":
        return pick(lang, k.roadmap);
      case "BUSINESS_MODEL":
        return pick(lang, k.businessModel);
      case "REVENUE":
        return pick(lang, {
          en: "The source provides projected revenue rather than confirmed current revenue. It projects revenue from $975K in Year 1 to $128M in Year 5, via planned streams such as commissions, subscriptions and facilitation services.",
          hi: "Source projected revenue deta hai, confirmed current revenue nahi. Year 1: $975K se Year 5: $128M tak projection hai.",
          hinglish: "Kitna kamati hai, iska confirmed current figure nahi hai. Source Year 1 $975K se Year 5 $128M tak projection deta hai."
        });
      case "PROJECTIONS":
        return pick(lang, k.projections);
      case "INVESTMENT":
        return pick(lang, {
          en: "The source outlines a $2 million investment ask to support agricultural trade digitisation, auctions, quality verification, logistics and market access. It does not establish that the $2M has already been raised.",
          hi: "Source $2 million investment ask outline karta hai. Yeh nahi kehta ki $2M raise ho chuka hai.",
          hinglish: "$2M raised hai? Source sirf investment ask outline karta hai — raised hone ka proof nahi."
        });
      case "INVESTMENT_ALLOCATION":
        return pick(lang, k.allocation);
      case "BENEFITS":
        return pick(lang, k.benefits);
      case "UNKNOWN":
      default:
        if (role === "farmer") return pick(lang, k.farmer);
        return pick(lang, k.unknown);
    }
  }

  function topicFromIntent(intent) {
    if (intent === "TRACEABILITY_EXPORTS") return "TRACEABILITY";
    if (intent === "EXPORTS" || intent === "EXPORTER") return "EXPORTS";
    return intent;
  }

  function reply(userText) {
    const lowered = userText.toLowerCase();
    if (/^open find mandi$/.test(lowered)) {
      if (typeof showPage === "function") showPage("mandis");
      return {
        intent: "FIND_MANDI",
        text: "Opening the Find Mandi section so you can browse listed mandi information. This assistant still cannot use your live location.",
        chips: chipsFor("FIND_MANDI")
      };
    }
    if (/^open prices$/.test(lowered)) {
      if (typeof showPage === "function") showPage("prices");
      return {
        intent: "PRICES",
        text: "Opening the Prices section for available sample market-price information. I still will not invent a live ₹/kg rate here.",
        chips: chipsFor("PRICES")
      };
    }
    if (/^open buyer/.test(lowered)) {
      if (typeof showPage === "function") showPage("connect");
      return {
        intent: "BUYER_SELLER",
        text: "Opening Buyer & Seller. You can browse listings there; I have not created a trade or contacted anyone.",
        chips: chipsFor("BUYER_SELLER")
      };
    }
    if (/^open register$/.test(lowered)) {
      if (typeof showPage === "function") showPage("contact");
      return {
        intent: "REGISTER",
        text: "Opening Register. Use the form on that page — I have not registered you.",
        chips: chipsFor("REGISTER")
      };
    }

    const lang = detectLanguage(userText);
    const norm = normalize(userText);
    const role = detectRole(norm) || state.role;
    if (role) state.role = role;
    let intent = detectIntent(userText);

    if (role && /how can .*help|kya benefit|help me|mere liye/.test(norm) && ["FARMER", "FPO", "BUYER", "EXPORTER", "MANDI", "TRADER", "PROCESSOR"].includes(role.toUpperCase())) {
      intent = role.toUpperCase();
    }
    if (state.role === "farmer" && intent === "UNKNOWN" && /help|benefit|fayda/.test(norm)) intent = "FARMER";

    const text = answerFor(intent, lang, state.role);
    state.lastIntent = intent === "TRACEABILITY_EXPORTS" ? "TRACEABILITY" : intent;
    state.lastTopic = topicFromIntent(intent);
    return { intent, text, chips: chipsFor(intent) };
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatText(text) {
    const blocks = text.trim().split(/\n{2,}/);
    return blocks.map((block) => {
      const lines = block.split("\n");
      const listLines = lines.filter((line) => line.trim().startsWith("•") || /^\d+\.\s/.test(line.trim()));
      if (listLines.length && listLines.length === lines.length) {
        const items = lines.map((line) => `<li>${escapeHtml(line.replace(/^[•\d.]+\s*/, ""))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`;
    }).join("");
  }

  function els() {
    return {
      launcher: document.getElementById("mcChatLauncher"),
      window: document.getElementById("mcChatWindow"),
      body: document.getElementById("mcChatBody"),
      form: document.getElementById("mcChatForm"),
      input: document.getElementById("mcChatInput"),
      close: document.getElementById("mcChatClose"),
      clear: document.getElementById("mcChatClear")
    };
  }

  function renderChips(chips) {
    if (!chips || !chips.length) return "";
    return `<div class="mc-chips">${chips.map((chip) => {
      const label = escapeHtml(chip.label);
      const text = escapeHtml(chip.text);
      const nav = chip.nav ? ` data-nav="${escapeHtml(chip.nav)}"` : "";
      const cls = chip.nav ? "mc-chip nav" : "mc-chip";
      return `<button type="button" class="${cls}" data-text="${text}"${nav}>${label}</button>`;
    }).join("")}</div>`;
  }

  function appendMessage(role, text, chips) {
    const { body } = els();
    const wrap = document.createElement("div");
    wrap.className = `mc-msg mc-msg-${role}`;
    wrap.innerHTML = `<div class="mc-bubble">${role === "user" ? `<p>${escapeHtml(text)}</p>` : formatText(text)}</div>${role === "assistant" ? renderChips(chips) : ""}`;
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
    wrap.querySelectorAll(".mc-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nav = btn.getAttribute("data-nav");
        const value = btn.getAttribute("data-text") || "";
        if (nav && typeof showPage === "function") {
          showPage(nav);
        }
        sendMessage(value);
      });
    });
  }

  function showTyping() {
    const { body } = els();
    const wrap = document.createElement("div");
    wrap.className = "mc-msg mc-msg-assistant";
    wrap.id = "mcTyping";
    wrap.innerHTML = `<div class="mc-bubble"><div class="mc-typing" aria-label="Mandi Connect is thinking"><span class="mc-dots"><span></span><span></span><span></span></span> Mandi Connect is thinking...</div></div>`;
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function hideTyping() {
    const node = document.getElementById("mcTyping");
    if (node) node.remove();
  }

  function welcome() {
    const { body } = els();
    body.innerHTML = "";
    appendMessage(
      "assistant",
      "Namaste! Welcome to Mandi Connect 🌾\n\nI can help you explore mandis, market prices, buyers, sellers, agricultural trade, exports and how Mandi Connect connects local markets to wider opportunities.",
      WELCOME_CHIPS
    );
  }

  function sendMessage(raw) {
    const text = (raw || "").trim();
    if (!text) return;
    const { input } = els();
    input.value = "";
    input.style.height = "auto";
    appendMessage("user", text);
    showTyping();
    window.setTimeout(() => {
      hideTyping();
      const result = reply(text);
      appendMessage("assistant", result.text, result.chips);
    }, 220);
  }

  function openChat() {
    const { launcher, window: win, input } = els();
    state.open = true;
    win.hidden = false;
    launcher.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    if (!win.dataset.welcomed) {
      welcome();
      win.dataset.welcomed = "true";
    }
    input.focus();
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  }

  function closeChat() {
    const { launcher, window: win } = els();
    state.open = false;
    win.hidden = true;
    launcher.classList.remove("is-open");
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  function clearChat() {
    state.lastIntent = null;
    state.lastTopic = null;
    state.role = null;
    welcome();
  }

  let bound = false;
  function bind() {
    if (bound) return;
    const ui = els();
    if (!ui.launcher || !ui.window) return;
    bound = true;
    ui.launcher.addEventListener("click", openChat);
    ui.close.addEventListener("click", closeChat);
    ui.clear.addEventListener("click", clearChat);
    ui.form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendMessage(ui.input.value);
    });
    ui.input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage(ui.input.value);
      }
    });
    ui.input.addEventListener("input", () => {
      ui.input.style.height = "auto";
      ui.input.style.height = `${Math.min(ui.input.scrollHeight, 110)}px`;
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.open) {
        closeChat();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  document.addEventListener("DOMContentLoaded", bind);
  if (document.readyState !== "loading") bind();
})();
