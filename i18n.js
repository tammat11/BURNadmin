/*
  Переключение языка сайта: русский, қазақша, English.

  Русский текст лежит прямо в разметке, поэтому без скрипта и до его загрузки
  страница читается полностью — словари нужны только для двух других языков.
  Выбор запоминается в localStorage и переносится на страницу Кодекса, иначе
  человек, переключивший язык, терял бы его на первом же переходе.
*/

(function () {
  "use strict";

  var DICT = {
    kk: {
      menuLabel: "Мәзір",
      ctaResident: "Резидент болу",
      heroLocation: "КӘСІПКЕРЛЕР<br>АЛМАТЫ",
      heroValues: "АДАМДАР<br>ИДЕЯЛАР<br>БИЗНЕС<br>АЛМАТЫ",
      heroBeyond: "БИЗНЕСТЕН<br>ДЕ АРТЫҚ",
      heroPeople: "КҮШ<br>АДАМДАРДА",
      principlesTitle: "ӨЗ ОРТАҢ",
      principleExperience: "Тәжірибе",
      principleExperienceText: "Нақты кәсіпкерлік тәжірибемен алмасу.",
      principleTrust: "Сенім",
      principleTrustText: "Жабық ортадағы ашық әңгіме.",
      principleAction: "Әрекет",
      principleActionText: "Нәтижеге жеткізетін таныстықтар.",
      photoCircle: "Өз ортаң. Шынайы әңгімелер.", photoTogether: "Іскерлік байланыстан да артық.",
      skip: "Мазмұнға өту",
      sideTab: "Резиденттер қабылдауы ашық · Алматы",
      brandSub: "Business club",
      navClub: "Клуб", navPath: "Қалай кіру керек", navLife: "Форматтар", navCode: "Кодекс",
      ctaApply: "Өтінім беру", ctaHow: "Кіру қалай өтеді", ctaReadCode: "Кодексті оқу",
      ctaReadFull: "Толық оқу",
      stampTitle: "Жабық клуб", stampSub: "Алматы · 2024 жылдан",
      heroTag: "Маусымға резиденттер қабылдауы ашық",
      heroTitle: "Ортаң<br>шешеді.",
      heroLede: "Кәсіпкерлердің<br>жабық клубы. Алматы.",
      heroHint: "Өтінім, жеке кездесу және кеңес шешімі арқылы кіру",
      cardTag: "Резидент картасы", cardSub: "Кәсіпкерлер қауымдастығы",
      fieldCity: "Қала", fieldLevel: "Деңгей", fieldStatus: "Мәртебе",
      almaty: "Алматы", astana: "Астана", shymkent: "Шымкент",
      resident: "Резидент", codeAccepted: "Қабылданды · 2026 ред.",
      astanaSoon: "Астана · жақында", shymkentSoon: "Шымкент · жақында",
      cardFoot: "Картаны кеңес қабылдаған адам алады. Ол қосымшаны, резиденттер каталогын, клуб чаттарын және өз қаласындағы серіктестер артықшылықтарын ашады.",
      ribEnv: "Орта", ribDeals: "Мәмілелер", ribDecisions: "Шешімдер", ribTrust: "Сенім",
      codeTitle: "Резидент кодексі",
      statSteps: "резиденттікке дейінгі қадам", statFormats: "клуб кездесуінің форматы",
      statClauses: "Кодекс бөлімі", statCities: "клуб жоспарындағы қала",
      clubTag: "Клуб не береді", clubTitle: "Нетворкинг алаңы емес, шеңбер",
      clubNote: "Мұнда бастауды үйретпейді және курс сатпайды. Адамдар шешім тезірек қабылданатын, серіктес бір әңгімеден табылатын орта үшін келеді. Әр резидент өзі әкелген адам үшін жауап береді.",
      tile1No: "01 / Орта", tile1H: "Жұмыс істеп тұрған бизнесі бар кәсіпкерлер",
      tile1P: "Құрам кіру кезінде тексеріледі — жеке кездесу және клуб кеңесінің шешімі. Кездейсоқ адам жоқ.",
      tile2No: "02 / Мәмілелер", tile2H: "Өзара мүддеге негізделген серіктестік",
      tile2P: "Клуб ішінде агрессивті сатуға Кодекс тыйым салады. BURN — клиенттер базасы емес, мәміле өзінен-өзі туатын орта.",
      tile3No: "03 / Шешімдер", tile3H: "Талдаулар және директорлар кеңесі",
      tile3P: "Жарты жыл созылған сұрақ, оны бастан кешкендермен бір кеште талданады.",
      tile4No: "04 / Сенім", tile4H: "Толық құпиялылық",
      tile4P: "Ішінде айтылғанның бәрі ішінде қалады. Бұзу — Кодекс бойынша ең ауыр тәртіпсіздіктің бірі.",
      pathTag: "Кіру қалай ұйымдастырылған", pathTitle: "Клубқа апарар жол — төрт қадам",
      pathNote: "Екі тарап та шешеді. Клуб адамның ортаға сай-сай еместігін қарайды, адам — клубтың өзіне сай екенін. Әр қадамда тоқтауға болады, бұл сәтсіздік емес, қалыпты нәтиже.",
      step1H: "Өтінім", step1P: "Аты-жөні, телефон, компания және Кодекспен келісім. Келісімсіз өтінім жіберілмейді — бұл формальдылық емес.",
      step2H: "Менеджердің қоңырауы", step2P: "Клуб менеджері қоңырау шалып, шарттарды түсіндіреді және сұрақтарға жауап береді. Осы жерде-ақ өзіңізге сай-сай еместігін түсінесіз.",
      step3H: "Жеке кездесу", step3P: "Ашық іс-шарада немесе бөлек резиденттермен танысу. Біз айналымға емес, адамға қараймыз.",
      step4H: "Кеңес шешімі", step4P: "Клуб кеңесі шешім қабылдайды. Резидент карта, қосымшаға және чаттарға кіру мүмкіндігін — және шеңбер алдындағы жауапкершілікті алады.",
      lifeTag: "Не болып жатады", lifeTitle: "Клуб форматтары",
      lifeNote: "Клуб кездесулермен тірі. Кесте, тіркелу және бос орындар — қосымшада; кейбір іс-шаралар қонақтарға ашық.",
      f1H: "Директорлар кеңесі", f1P: "Резиденттер сұраныстарын және клуб шешімдерін ай сайын талдау. Ресми бөлім — алкогольсіз.",
      f2H: "Бизнес-таңғы астар", f2P: "Таң, шағын құрам, нақты міндеттер және тәжірибе алмасу.",
      f3H: "Талдаулар және стратегиялық сессиялар", f3P: "Бір компания, бір сұрақ, тығыз жұмыс кеші.",
      f4H: "Спикерлермен кездесулер", f4P: "Кітаптан оқуға болмайтын тәжірибесі бар адамдар.",
      f5H: "Спорт және сапарлар", f5P: "Футбол, жүгіру, балық аулау, аңшылық, ерлер сапарлары.",
      f6H: "Отбасы күндері", f6P: "Клуб берік отбасыны қолдайды, одан алыстатпайды.",
      geoTag: "География", geoTitle: "Қалалар",
      geoNote: "Резидент өз қаласының іс-шаралары мен артықшылықтарын көреді. Басқа қалаға барса — қосымшада қаланы ауыстырып, сол жердегі кездесуге барады.",
      cityLive: "Жұмыс істейді", citySoon: "Жақында",
      cityOpen: "Қабылдау ашық", cityPrep: "Ашылуы дайындалуда",
      docTag: "Клуб құжаты",
      codeNote: "Кодекс — тыйымдар тізімі емес, әр резидент қалғандарға беретін уәде. Дәл сол клубты өз сұрағыңмен келуге болатын орынға айналдырады. Үміткер оны өтінімге дейін оқиды, келісім құжат нұсқасымен бірге тіркеледі.",
      c1: "Басты ереже — экологиялық болу", c2: "Ресми іс-шараларда сергектік",
      c3: "Отбасылық және бауырластық құндылықтар", c4: "BURN — клиенттер базасы емес",
      c5: "Толық құпиялылық", c6: "Адалдық және ашықтық", c7: "Қаржылық адалдық",
      c8: "Іс-шараларға қатысу тәртібі", c9: "Қауымдастық тәртібін құрметтеу",
      c10: "Өзара қолдау мәдениеті", c11: "Бұзғаны үшін жауапкершілік", c12: "Шығару негіздері",
      joinTag: "Кіру", joinTitle: "Резиденттікке өтінім",
      joinNote: 'Өтінімді клуб кеңесі қарайды. Одан кейін менеджер қоңырау шалып, шарттарды түсіндіреді — екі тарап та шешеді. Жібермес бұрын <a href="code.html" style="color:var(--ember)">Резидент кодексін</a> оқыңыз: онымен келісім міндетті.',
      joinGate: "Үш тармақтың бәрі белгіленбейінше жіберу қолжетімсіз. Осылайша клуб шарттарымен келіспейтіндер кіреберісте бөлінеді — мұны телефонмен анықтау кеш.",
      formTitle: "Өтінім бланкісі", formCity: "Алматы · 2026",
      fName: "Аты және тегі", fPhone: "Телефон", fCompany: "Компания",
      cons1: 'Мен <a href="code.html">BURN резидент кодексін</a> оқыдым және келісемін',
      cons2: "Клуб менеджерінің маған телефон соғуына келісемін",
      cons3: "Өтінімді қарау үшін жеке деректерді өңдеуге келісемін",
      fSubmit: "Өтінім жіберу",
      navWho: "Кімге сюда", navYear: "Клубтағы жыл", navFaq: "Сұрақтар",
      ctaCheck: "Маған сай ма, тексерейін",
      whoTag: "Адал сүзгі", whoTitle: "Кездейсоқ таныстық емес. Өз ортаң.",
      whoNote: "Орта бизнестің ауқымын анықтайды. Бізге жұмыс істеп тұрған бизнес, ашықтық және қауымдастыққа үлес қосуға дайындық маңызды.",
      fitYes: "Сізге осында", fitNo: "Сізге бұл жер емес",
      yes1: "Бизнесіңіз жұмыс істеп тұр және жылына 200 000 000 ₸ айналым береді.",
      yes2: "Өз сұрағыңызды талдауға шығарып, ыңғайсыз пікір естуге дайынсыз.",
      yes3: "Телефондағы жүз байланыстан гөрі бір нақты әңгіме сізге қымбат.",
      yes4: "Кездесуге орныңызға менеджер жібермей, өзіңіз келесіз.",
      no1: "Клиенттер базасы және тікелей сату алаңы керек.",
      no2: "Әзірге айналымы жоқ идеяға инвестор іздеп жүрсіз.",
      no3: "«Бұл қандай клуб екен» деп қарап, кейін шешкіңіз келеді.",
      no4: "Қауымдастық ережелері артық формальдылық болып көрінеді.",
      yearTag: "Ырғақ", yearTitle: "Клубтағы жыл",
      yearNote: "Клуб анонспен емес, кестемен тірі. Директорлар кеңесі мен таңғы астар ай сайын қайталанады, талдаулар мен сапарлар — маусымға қарай. Кесте, тіркелу және бос орындар — қосымшада.",
      beatMonthly: "Ай сайын", beatMonthlyRequired: "Ай сайын · міндетті", beatQuarterly: "Тоқсанына бір рет",
      beatByRequest: "Сұраныс бойынша", beatSeason: "Маусымға қарай",
      beat1H: "Директорлар кеңесі", beat1P: "Тұрақты топ резиденттердің міндеттеріне шешім іздейді. Дайындық міндетті, кездесу мазмұны құпия.",
      beat2H: "Бизнес-таңғы ас", beat2P: "Шақырылған спикерлер мен сарапшылардың сөз сөйлеуімен өтетін таңғы кездесу.",
      beat3H: "Талдау", beat3P: "Бизнес-кейстер, міндеттер мен сұраныстар кәсіпкерлер және шақырылған сарапшылармен бірге талданады.",
      beat4H: "Челленджтер және өсу тәжірибелері", beat4P: "Резиденттің жеке және кәсіпкерлік дағдыларын дамытатын белсенділіктер.",
      beat5H: "Инвест-топ және жобалар биржасы", beat5P: "Инвестициялық ұсыныстармен алмасу, серіктес іздеу және жобаларды талқылау.",
      beat6H: "Моншалар, сапарлар және саяхаттар", beat6P: "Резиденттердің жабық бейресми кездесулері және бірлескен сапарлары.",
      valueTag: "Мәні бойынша", valueTitle: "Резидент өзімен не алып кетеді",
      valueNote: "«Он есе өсу» туралы уәдесіз. Мінеки, кіргеннен кейін адамда нақты не пайда болады.",
      gain1H: "Қоңырау шалуға болатын орта",
      gain1P: "Құрам кіруде тексерілген: жеке кездесу және кеңес шешімі. Сұрақ бос кеңістікке емес, сол жолдан өткен нақты адамға барады.",
      gain2H: "Өз сұрағыңның талдауы",
      gain2P: "Айына бір рет директорлар кеңесі резиденттің сұранысын жұмысқа алады. Жарты жыл созылған нәрсе бір кеште талданады.",
      gain3H: "Тікелей сатусыз серіктестік",
      gain3P: "Іште агрессивті сатуға Кодекс тыйым салады — сондықтан мұнда іс жөнінде сөйлеседі, ал мәмілелер өзінен-өзі туады.",
      gain4H: "Клуб қосымшасы",
      gain4P: "Кесте және тіркелу, резиденттер каталогы, чаттар, оқыту, серіктестер артықшылықтары, белсенділік рейтингі.",
      gain5H: "Арқадан сөз айтылмайтын орта",
      gain5P: "Құпиялылық — Кодекстің ең қатаң ережелерінің бірі. Ішінде айтылғанның бәрі ішінде қалады.",
      faqTag: "Өтінім бермес бұрын", faqTitle: "Жиі қойылатын сұрақтар",
      faqNote: "Сұрағыңыз мұнда болмаса — оны өтінімнен кейінгі қоңырауда менеджерге қойыңыз. Бұл оның жұмысы.",
      q1: "Резиденттік қанша тұрады?",
      a1: "Жарна — қатысудың бір күнтізбелік жылы үшін 900 000 ₸. Жыл төлем түскен күннен басталады. Жарна тіркелген: қанша іс-шараға барғаныңызға байланысты емес. Келесі жылға ұзарту — төлем сәтінде қолданыстағы баға бойынша.",
      q2: "Барлық кездесуге қатысу міндетті ме?",
      a2: "Тек Директорлар кеңесі міндетті — ол ай сайын тұрақты топта өтеді және дайындықты талап етеді. Ескертумен үш кеңесті жіберуге болады; төртіншісінен кейін резидент топтан шығады. Қалған форматтар — қалауыңыз бойынша.",
      q3: "Мен Алматыдан емеспін. Кіруге бола ма?",
      a3: "Қазір клуб Алматыда жұмыс істейді, Астана мен Шымкент дайындалуда. Өтінімді қазір беруге болады — қалаңыз ашылғанда бірінші құрамға кіресіз.",
      q4: "Кірмес бұрын келіп көруге бола ма?",
      a4: "Иә. Кейбір іс-шаралар қонақтарға ашық — резиденттермен танысу сонда өтеді, бұл жолдың үшінші қадамы.",
      q5: "Кеңес бас тартса ше?",
      a5: "Бұл қалыпты нәтиже, үкім емес. Менеджер себебін түсіндіреді; жағдай өзгергенде қайта өтінім беруге болады.",
      q6: "Резиденттерге өз қызметімді сатуға бола ма?",
      a6: "Тікелей сатуға Кодекс тыйым салады. Немен пайдалы екеніңізді резиденттер каталогында айтуға болады — әрі қарай адам өзі шешеді.",
      contactsTag: "Байланыс", contactsTitle: "Клуб байланыстары",
      contactsNote: "Кіру, серіктестік және іс-шараларға қатысу мәселелері бойынша.",
      contactIg: "Кездесу анонстары және клуб өмірі",
      contactFormLabel: "Өтінім", contactFormValue: "Сайттағы форма",
      contactFormNote: "Өтінімнен кейін менеджер қоңырау шалады",
      contactAppLabel: "Қосымша", contactAppNote: "Резидент шақыруымен қолжетімді",
      q7: "Жарнаны қайтаруға бола ма?",
      a7: "Жоқ. Келісім шарттары бойынша жарна — бір жылға қатысу құқығы үшін тіркелген төлем; ол қайтарылмайды және басқа адамға берілмейді, мерзімінен бұрын бұзылған жағдайда да. Сондықтан клуб кеңес шешім қабылдағанға дейін төлем алмайды.",
      joinPrice: 'Резидент жарнасы — <b>күнтізбелік жылға 900 000 ₸</b>. Төлем тек кеңес шешімінен кейін; шарттар — <a href="oferta.html" style="color:var(--fire-lit)">жария офертада</a>.',
      reqTitle: "Деректемелер", reqName: "Атауы", reqBin: "ЖСН/БСН", reqAddr: "Мекенжай",
      reqAddrValue: "ҚР, Алматы қ., Телжан Шонанұлы к-сі, 102",
      reqIik: "ЖСК", reqBank: "Банк", reqBankValue: "«Қазақстан Халық Банкі» АҚ",
      reqBik: "БСК", reqHead: "Басшы", reqHeadValue: "Спирина К. В.",
      footClub: "Клуб", footContact: "Байланыс", footDocs: "Құжаттар",
      footAbout: "Қауымдастық туралы", footAbout2: "Кәсіпкерлердің жабық қауымдастығы. Алматы, Қазақстан.",
      footApp: "Қосымша", footPrivacy: "Құпиялылық", footSupport: "Қолдау",
      footCity: "Алматы, Қазақстан",
      footCities: "Алматы · Астана · Шымкент",
      codeH1: "BURN резидент кодексі",
      codeAuthentic: "Кодекстің түпнұсқа мәтіні — орыс тілінде. Төмендегі мәтін сол тілде беріледі.",
      legalAuthentic: "Құжаттың түпнұсқа мәтіні — орыс тілінде. Төмендегі мәтін сол тілде беріледі.",
      footOferta: "Жария оферта",
      ctaHome: "Басты бетке",
    },
    en: {
      menuLabel: "Menu",
      ctaResident: "Become a resident",
      heroLocation: "ENTREPRENEURS<br>ALMATY",
      heroValues: "PEOPLE<br>IDEAS<br>BUSINESS<br>ALMATY",
      heroBeyond: "MORE THAN<br>BUSINESS",
      heroPeople: "STRENGTH<br>IN PEOPLE",
      principlesTitle: "INNER CIRCLE",
      principleExperience: "Experience",
      principleExperienceText: "Real entrepreneurial experience, shared.",
      principleTrust: "Trust",
      principleTrustText: "Honest conversations in a private circle.",
      principleAction: "Action",
      principleActionText: "Connections that lead to results.",
      photoCircle: "Your people. Real conversations.", photoTogether: "More than business connections.",
      skip: "Skip to content",
      sideTab: "Applications open · Almaty",
      brandSub: "Business club",
      navClub: "Club", navPath: "How to join", navLife: "Formats", navCode: "Code",
      ctaApply: "Apply", ctaHow: "How joining works", ctaReadCode: "Read the Code",
      ctaReadFull: "Read in full",
      stampTitle: "Private club", stampSub: "Almaty · since 2024",
      heroTag: "Applications for the season are open",
      heroTitle: "Your circle<br>defines you.",
      heroLede: "A private entrepreneurs<br>club. Almaty.",
      heroHint: "By application, personal meeting and council decision",
      cardTag: "Resident card", cardSub: "Community of entrepreneurs",
      fieldCity: "City", fieldLevel: "Level", fieldStatus: "Status",
      almaty: "Almaty", astana: "Astana", shymkent: "Shymkent",
      resident: "Resident", codeAccepted: "Accepted · 2026 ed.",
      astanaSoon: "Astana · soon", shymkentSoon: "Shymkent · soon",
      cardFoot: "The card goes to whoever the council accepts. It opens the app, the resident directory, the club chats and partner privileges in their own city.",
      ribEnv: "Peers", ribDeals: "Deals", ribDecisions: "Decisions", ribTrust: "Trust",
      codeTitle: "Resident Code",
      statSteps: "steps to residency", statFormats: "club meeting formats",
      statClauses: "sections in the Code", statCities: "cities in the club's plans",
      clubTag: "What the club gives", clubTitle: "Not a networking venue, a circle",
      clubNote: "Nobody here teaches you to start up or sells you a course. People come for an environment where decisions land faster and a partner is one conversation away. Every resident answers for whoever they brought in.",
      tile1No: "01 / Peers", tile1H: "Entrepreneurs with a running business",
      tile1P: "Membership is vetted on entry — a personal meeting and a decision by the club council. Nobody is here by accident.",
      tile2No: "02 / Deals", tile2H: "Partnerships built on mutual interest",
      tile2P: "Hard selling inside the club is forbidden by the Code. BURN is not a lead list; it is where deals happen on their own.",
      tile3No: "03 / Decisions", tile3H: "Case reviews and the board",
      tile3P: "The question you have been putting off for six months gets worked through in one evening by people who have been there.",
      tile4No: "04 / Trust", tile4H: "Complete confidentiality",
      tile4P: "What is said inside stays inside. Breaking that is among the gravest offences under the Code.",
      pathTag: "How joining works", pathTitle: "Four steps into the club",
      pathNote: "Both sides decide. The club looks at whether the person fits the circle; the person looks at whether the club fits them. You can stop at any step, and that is a normal outcome rather than a failure.",
      step1H: "Application", step1P: "Name, phone, company and agreement with the Code. Without that agreement the form will not send — this is not a formality.",
      step2H: "Call from a manager", step2P: "A club manager calls, explains the terms and answers questions. By then you already know whether this is for you.",
      step3H: "Meeting in person", step3P: "You meet residents at an open event or separately. We look at the person, not the turnover.",
      step4H: "Council decision", step4P: "The club council decides. A resident receives the card, access to the app and the chats — and responsibility for the circle.",
      lifeTag: "What happens", lifeTitle: "Club formats",
      lifeNote: "The club lives through its meetings. Schedule, registration and remaining seats are in the app; some events are open to guests.",
      f1H: "Board meeting", f1P: "A monthly review of residents' requests and club decisions. The formal part is alcohol-free.",
      f2H: "Business breakfasts", f2P: "Morning, a small group, concrete problems and shared practice.",
      f3H: "Case reviews and strategy sessions", f3P: "One company, one question, an evening of dense work.",
      f4H: "Speaker evenings", f4P: "People with experience you cannot get from a book.",
      f5H: "Sport and trips", f5P: "Football, races, fishing, hunting, trips for the men of the club.",
      f6H: "Family days", f6P: "The club supports strong families rather than pulling people away from them.",
      geoTag: "Geography", geoTitle: "Cities",
      geoNote: "A resident sees the events and privileges of their own city. Travelling elsewhere, they switch city in the app and join a meeting there.",
      cityLive: "Active", citySoon: "Soon",
      cityOpen: "Applications open", cityPrep: "Opening in preparation",
      docTag: "Club document",
      codeNote: "The Code is not a list of bans but a promise every resident makes to the others. It is what makes the club a place you can bring your own question to. A candidate reads it before applying, and their agreement is recorded together with the version of the document.",
      c1: "The main rule — do no harm to the circle", c2: "Sobriety at formal events",
      c3: "Family and brotherhood values", c4: "BURN is not a lead list",
      c5: "Complete confidentiality", c6: "Honesty and openness", c7: "Financial integrity",
      c8: "Discipline in attending events", c9: "Respect for how the community works",
      c10: "A culture of mutual support", c11: "Responsibility for breaches", c12: "Grounds for exclusion",
      joinTag: "Joining", joinTitle: "Application for residency",
      joinNote: 'The club council reviews your application. A manager then calls and explains the terms — both sides decide. Before sending, read the <a href="code.html" style="color:var(--ember)">Resident Code</a>: agreeing to it is required.',
      joinGate: "Sending stays disabled until all three boxes are ticked. That way anyone who does not accept the club's terms stops at the door — finding this out over the phone is too late.",
      formTitle: "Application form", formCity: "Almaty · 2026",
      fName: "Full name", fPhone: "Phone", fCompany: "Company",
      cons1: 'I have read and agree to the <a href="code.html">BURN Resident Code</a>',
      cons2: "I agree that a club manager may call me",
      cons3: "I consent to my personal data being processed to review this application",
      fSubmit: "Send application",
      navWho: "Who it is for", navYear: "A year here", navFaq: "Questions",
      ctaCheck: "See if this is for me",
      whoTag: "An honest filter", whoTitle: "Beyond introductions. Your people.",
      whoNote: "Your circle shapes your ambition. We value an established business, openness and the willingness to contribute. See how your expectations align with our principles.",
      fitYes: "This is for you", fitNo: "This is not for you",
      yes1: "Your business is running and turns over at least 200,000,000 ₸ a year.",
      yes2: "You are ready to put your own question up for review and hear uncomfortable answers.",
      yes3: "One conversation that goes somewhere is worth more to you than a hundred contacts.",
      yes4: "You come to meetings yourself instead of sending a manager in your place.",
      no1: "You want a lead list and a floor for hard selling.",
      no2: "You are looking for an investor for an idea that has no turnover yet.",
      no3: "You want to have a look at the club first and decide later.",
      no4: "The rules of the community look like unnecessary formalities.",
      yearTag: "Rhythm", yearTitle: "A year in the club",
      yearNote: "The club runs on a schedule, not on announcements. The board and the breakfasts repeat every month; reviews and trips follow the season. Schedule, registration and remaining seats are in the app.",
      beatMonthly: "Monthly", beatMonthlyRequired: "Monthly · required", beatQuarterly: "Quarterly",
      beatByRequest: "On request", beatSeason: "Seasonal",
      beat1H: "Board meeting", beat1P: "A fixed group works through the problems residents bring. Preparation is required and everything said stays confidential.",
      beat2H: "Business breakfast", beat2P: "A morning meeting with talks by invited speakers and experts.",
      beat3H: "Case review", beat3P: "Business cases, problems and requests worked through with entrepreneurs and invited experts.",
      beat4H: "Challenges and growth practice", beat4P: "Activities that build a resident's personal and entrepreneurial skills.",
      beat5H: "Investment group and project exchange", beat5P: "Trading investment proposals, finding partners and discussing projects.",
      beat6H: "Banya, trips and travel", beat6P: "Closed informal gatherings and trips residents take together.",
      valueTag: "Concretely", valueTitle: "What a resident walks away with",
      valueNote: "No promises of tenfold growth. Here are the concrete things a person has after joining.",
      gain1H: "A circle you can call",
      gain1P: "Membership is vetted at the door: a personal meeting and a decision by the council. Your question goes to a specific person who has been through it, not into the void.",
      gain2H: "Your own question, worked through",
      gain2P: "Once a month the board takes a resident's request into work. What you have been putting off for six months gets resolved in one evening.",
      gain3H: "Partnerships without the hard sell",
      gain3P: "Aggressive selling inside is forbidden by the Code — so people talk about substance, and deals happen on their own.",
      gain4H: "The club app",
      gain4P: "Schedule and registration, a directory of residents with their niches and requests, chats, courses, partner privileges, an activity rating.",
      gain5H: "A room where nobody talks behind your back",
      gain5P: "Confidentiality is among the strictest rules of the Code. What is said inside stays inside.",
      faqTag: "Before you apply", faqTitle: "Questions we get most often",
      faqNote: "If your question is not here, put it to the manager on the call after your application. That is what the call is for.",
      q1: "How much does residency cost?",
      a1: "The fee is 900,000 ₸ for one calendar year of participation. The year starts on the day payment is received. The fee is fixed: it does not depend on how many events you attend. Renewal for the next year is at the price in force at the time of payment.",
      q2: "Do I have to attend everything?",
      a2: "Only the board meeting is mandatory — it is monthly, runs in a fixed group and requires preparation. You may miss three with notice; after a fourth you leave the group. Every other format is optional.",
      q3: "I am not in Almaty. Can I still join?",
      a3: "The club currently operates in Almaty; Astana and Shymkent are in preparation. You can apply now — when your city opens you will be in the first intake.",
      q4: "Can I come and look before joining?",
      a4: "Yes. Some events are open to guests — that is where you meet residents, the third step of the path.",
      q5: "What if the council says no?",
      a5: "That is a normal outcome, not a verdict. The manager will explain why; you can apply again when circumstances change.",
      q6: "Can I sell my services to residents?",
      a6: "Hard selling is forbidden by the Code. You can state what you are useful for in the resident directory — and let people decide for themselves.",
      contactsTag: "Contact", contactsTitle: "Club contacts",
      contactsNote: "For joining, partnerships and attending events.",
      contactIg: "Event announcements and club life",
      contactFormLabel: "Application", contactFormValue: "Form on this site",
      contactFormNote: "A manager calls you back after your application",
      contactAppLabel: "App", contactAppNote: "Access by a resident's invitation",
      q7: "Can the fee be refunded?",
      a7: "No. Under the agreement the fee is a fixed payment for the right to take part for a year; it is not refunded and not transferable to another person, including on early termination. That is why the club takes no payment until the council has decided.",
      joinPrice: 'The resident fee is <b>900,000 ₸ per calendar year</b>. Payment only after the council decides; the terms are in the <a href="oferta.html" style="color:var(--fire-lit)">public offer</a>.',
      reqTitle: "Legal details", reqName: "Name", reqBin: "IIN/BIN", reqAddr: "Address",
      reqAddrValue: "102 Telzhan Shonanuly St., Almaty, Kazakhstan",
      reqIik: "IBAN", reqBank: "Bank", reqBankValue: "Halyk Bank of Kazakhstan JSC",
      reqBik: "BIC", reqHead: "Director", reqHeadValue: "K. V. Spirina",
      footClub: "Club", footContact: "Contact", footDocs: "Documents",
      footAbout: "About the community", footAbout2: "A private community of entrepreneurs. Almaty, Kazakhstan.",
      footApp: "App", footPrivacy: "Privacy", footSupport: "Support",
      footCity: "Almaty, Kazakhstan",
      footCities: "Almaty · Astana · Shymkent",
      codeH1: "BURN Resident Code",
      codeAuthentic: "The authoritative text of the Code is in Russian. The text below is given in that language.",
      legalAuthentic: "The authoritative text of this document is in Russian. The text below is given in that language.",
      footOferta: "Public offer",
      ctaHome: "Back to the homepage",
    },
  };

  var STORE = "burn.lang";
  var TITLES = {
    kk: {
      index: "BURN — кәсіпкерлердің жабық қауымдастығы, Алматы",
      code: "Резидент кодексі — BURN",
      oferta: "Жария оферта — BURN",
      privacy: "Құпиялылық саясаты — BURN",
    },
    en: {
      index: "BURN — a private community of entrepreneurs, Almaty",
      code: "Resident Code — BURN",
      oferta: "Public offer — BURN",
      privacy: "Privacy policy — BURN",
    },
  };

  /* Русский восстанавливаем из самой разметки, а не из четвёртого словаря:
     иначе один и тот же текст жил бы в двух местах и однажды разошёлся. */
  var base = null;
  function snapshot() {
    if (base) return base;
    base = { text: new Map(), html: new Map(), title: document.title };
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      if (!base.text.has(node.dataset.i18n)) base.text.set(node.dataset.i18n, node.textContent);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (node) {
      if (!base.html.has(node.dataset.i18nHtml)) base.html.set(node.dataset.i18nHtml, node.innerHTML);
    });
    return base;
  }

  function apply(lang) {
    var ru = snapshot();
    var dict = DICT[lang];
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.dataset.i18n;
      var value = dict ? dict[key] : ru.text.get(key);
      if (value === undefined) value = ru.text.get(key);
      if (value !== undefined) node.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (node) {
      var key = node.dataset.i18nHtml;
      var value = dict ? dict[key] : ru.html.get(key);
      if (value === undefined) value = ru.html.get(key);
      if (value !== undefined) node.innerHTML = value;
    });
    var note = document.querySelector('[data-i18n="codeAuthentic"], [data-i18n="legalAuthentic"]');
    /* Кодекс мы не переводим: согласие резидента фиксируется против русской
       редакции, и второй «official» текст создавал бы расхождение. Поэтому на
       других языках честно говорим, какой текст аутентичный. */
    if (note) note.hidden = lang === "ru";
    document.documentElement.lang = lang;
    var page = document.body.dataset.page || "index";
    if (lang !== "ru" && TITLES[lang] && TITLES[lang][page]) document.title = TITLES[lang][page];
    else document.title = ru.title;
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      var on = button.dataset.lang === lang;
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function stored() {
    var url = new URLSearchParams(location.search).get("lang");
    if (url && (url === "ru" || DICT[url])) return url;
    try {
      var saved = localStorage.getItem(STORE);
      if (saved && (saved === "ru" || DICT[saved])) return saved;
    } catch (error) {
      /* Приватный режим: язык просто не запомнится. */
    }
    return "ru";
  }

  function start() {
    snapshot();
    apply(stored());
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        var lang = button.dataset.lang;
        try { localStorage.setItem(STORE, lang); } catch (error) { /* см. выше */ }
        apply(lang);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
