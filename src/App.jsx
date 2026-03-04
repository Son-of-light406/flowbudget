import { useState, useMemo, useRef, useEffect } from "react";
import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── DEVISES DU MONDE ───────────────────────────────────────────────────────
const CURRENCIES = [
  {code:"AED",symbol:"د.إ",label:"Dirham des Émirats"},{code:"AFN",symbol:"؋",label:"Afghani afghan"},
  {code:"ALL",symbol:"L",label:"Lek albanais"},{code:"AMD",symbol:"֏",label:"Dram arménien"},
  {code:"AOA",symbol:"Kz",label:"Kwanza angolais"},{code:"ARS",symbol:"$",label:"Peso argentin"},
  {code:"AUD",symbol:"A$",label:"Dollar australien"},{code:"AZN",symbol:"₼",label:"Manat azerbaïdjanais"},
  {code:"BAM",symbol:"KM",label:"Mark bosnien"},{code:"BDT",symbol:"৳",label:"Taka bangladais"},
  {code:"BGN",symbol:"лв",label:"Lev bulgare"},{code:"BHD",symbol:"BD",label:"Dinar bahreïni"},
  {code:"BIF",symbol:"Fr",label:"Franc burundais"},{code:"BND",symbol:"B$",label:"Dollar de Brunei"},
  {code:"BOB",symbol:"Bs.",label:"Boliviano"},{code:"BRL",symbol:"R$",label:"Réal brésilien"},
  {code:"BWP",symbol:"P",label:"Pula botswanais"},{code:"BYN",symbol:"Br",label:"Rouble biélorusse"},
  {code:"BZD",symbol:"BZ$",label:"Dollar bélizien"},{code:"CAD",symbol:"CA$",label:"Dollar canadien"},
  {code:"CDF",symbol:"FC",label:"Franc congolais"},{code:"CHF",symbol:"Fr.",label:"Franc suisse"},
  {code:"CLP",symbol:"$",label:"Peso chilien"},{code:"CNY",symbol:"¥",label:"Yuan chinois"},
  {code:"COP",symbol:"$",label:"Peso colombien"},{code:"CRC",symbol:"₡",label:"Colon costaricain"},
  {code:"CUP",symbol:"$MN",label:"Peso cubain"},{code:"CZK",symbol:"Kč",label:"Couronne tchèque"},
  {code:"DJF",symbol:"Fr",label:"Franc djiboutien"},{code:"DKK",symbol:"kr",label:"Couronne danoise"},
  {code:"DOP",symbol:"RD$",label:"Peso dominicain"},{code:"DZD",symbol:"دج",label:"Dinar algérien"},
  {code:"EGP",symbol:"£",label:"Livre égyptienne"},{code:"ETB",symbol:"Br",label:"Birr éthiopien"},
  {code:"EUR",symbol:"€",label:"Euro"},{code:"GBP",symbol:"£",label:"Livre sterling"},
  {code:"GEL",symbol:"₾",label:"Lari géorgien"},{code:"GHS",symbol:"₵",label:"Cedi ghanéen"},
  {code:"GMD",symbol:"D",label:"Dalasi gambien"},{code:"GNF",symbol:"Fr",label:"Franc guinéen"},
  {code:"GTQ",symbol:"Q",label:"Quetzal guatémaltèque"},{code:"HKD",symbol:"HK$",label:"Dollar de Hong Kong"},
  {code:"HNL",symbol:"L",label:"Lempira hondurien"},{code:"HTG",symbol:"G",label:"Gourde haïtienne"},
  {code:"HUF",symbol:"Ft",label:"Forint hongrois"},{code:"IDR",symbol:"Rp",label:"Roupiah indonésienne"},
  {code:"ILS",symbol:"₪",label:"Shekel israélien"},{code:"INR",symbol:"₹",label:"Roupie indienne"},
  {code:"IQD",symbol:"ع.د",label:"Dinar irakien"},{code:"IRR",symbol:"﷼",label:"Rial iranien"},
  {code:"ISK",symbol:"kr",label:"Couronne islandaise"},{code:"JMD",symbol:"J$",label:"Dollar jamaïcain"},
  {code:"JOD",symbol:"JD",label:"Dinar jordanien"},{code:"JPY",symbol:"¥",label:"Yen japonais"},
  {code:"KES",symbol:"KSh",label:"Shilling kényan"},{code:"KHR",symbol:"៛",label:"Riel cambodgien"},
  {code:"KMF",symbol:"Fr",label:"Franc comorien"},{code:"KRW",symbol:"₩",label:"Won sud-coréen"},
  {code:"KWD",symbol:"KD",label:"Dinar koweïtien"},{code:"KZT",symbol:"₸",label:"Tenge kazakh"},
  {code:"LAK",symbol:"₭",label:"Kip laotien"},{code:"LBP",symbol:"ل.ل",label:"Livre libanaise"},
  {code:"LKR",symbol:"₨",label:"Roupie sri-lankaise"},{code:"LYD",symbol:"LD",label:"Dinar libyen"},
  {code:"MAD",symbol:"MAD",label:"Dirham marocain"},{code:"MDL",symbol:"L",label:"Leu moldave"},
  {code:"MGA",symbol:"Ar",label:"Ariary malgache"},{code:"MMK",symbol:"K",label:"Kyat birman"},
  {code:"MNT",symbol:"₮",label:"Tögrög mongol"},{code:"MUR",symbol:"₨",label:"Roupie mauricienne"},
  {code:"MWK",symbol:"MK",label:"Kwacha malawien"},{code:"MXN",symbol:"Mex$",label:"Peso mexicain"},
  {code:"MYR",symbol:"RM",label:"Ringgit malaisien"},{code:"MZN",symbol:"MT",label:"Metical mozambicain"},
  {code:"NAD",symbol:"N$",label:"Dollar namibien"},{code:"NGN",symbol:"₦",label:"Naira nigérian"},
  {code:"NIO",symbol:"C$",label:"Córdoba nicaraguayen"},{code:"NOK",symbol:"kr",label:"Couronne norvégienne"},
  {code:"NPR",symbol:"₨",label:"Roupie népalaise"},{code:"NZD",symbol:"NZ$",label:"Dollar néo-zélandais"},
  {code:"OMR",symbol:"﷼",label:"Rial omanais"},{code:"PEN",symbol:"S/.",label:"Sol péruvien"},
  {code:"PHP",symbol:"₱",label:"Peso philippin"},{code:"PKR",symbol:"₨",label:"Roupie pakistanaise"},
  {code:"PLN",symbol:"zł",label:"Zloty polonais"},{code:"PYG",symbol:"₲",label:"Guaraní paraguayen"},
  {code:"QAR",symbol:"﷼",label:"Riyal qatari"},{code:"RON",symbol:"lei",label:"Leu roumain"},
  {code:"RSD",symbol:"din",label:"Dinar serbe"},{code:"RUB",symbol:"₽",label:"Rouble russe"},
  {code:"RWF",symbol:"Fr",label:"Franc rwandais"},{code:"SAR",symbol:"﷼",label:"Riyal saoudien"},
  {code:"SDG",symbol:"ج.س",label:"Livre soudanaise"},{code:"SEK",symbol:"kr",label:"Couronne suédoise"},
  {code:"SGD",symbol:"S$",label:"Dollar de Singapour"},{code:"SOS",symbol:"Sh",label:"Shilling somalien"},
  {code:"SRD",symbol:"$",label:"Dollar surinamais"},{code:"SYP",symbol:"£",label:"Livre syrienne"},
  {code:"THB",symbol:"฿",label:"Baht thaïlandais"},{code:"TND",symbol:"DT",label:"Dinar tunisien"},
  {code:"TRY",symbol:"₺",label:"Lire turque"},{code:"TTD",symbol:"TT$",label:"Dollar de Trinité"},
  {code:"TWD",symbol:"NT$",label:"Dollar de Taïwan"},{code:"TZS",symbol:"Sh",label:"Shilling tanzanien"},
  {code:"UAH",symbol:"₴",label:"Hryvnia ukrainien"},{code:"UGX",symbol:"Sh",label:"Shilling ougandais"},
  {code:"USD",symbol:"$",label:"Dollar américain"},{code:"UYU",symbol:"$U",label:"Peso uruguayen"},
  {code:"VND",symbol:"₫",label:"Dong vietnamien"},{code:"XAF",symbol:"FCFA",label:"Franc CFA Afrique Centrale"},
  {code:"XOF",symbol:"CFA",label:"Franc CFA Afrique de l'Ouest"},{code:"XPF",symbol:"CFP",label:"Franc CFP Pacifique"},
  {code:"YER",symbol:"﷼",label:"Rial yéménite"},{code:"ZAR",symbol:"R",label:"Rand sud-africain"},
  {code:"ZMW",symbol:"ZK",label:"Kwacha zambien"},{code:"ZWL",symbol:"Z$",label:"Dollar zimbabwéen"},
];

// ─── LANGUES ────────────────────────────────────────────────────────────────
const LANGS = {
  fr:{code:"fr",flag:"🇫🇷",name:"Français",dir:"ltr",
    appName:"FlowBudget",appSub:"Gestion financière personnelle",
    tabs:["Tableau de bord","Transactions","Objectifs","Analyses"],
    income:"Revenus",expense:"Dépenses",balance:"Solde",savings:"Épargne",
    spendRate:"Taux de dépense",addBtn:"+ Nouvelle transaction",
    newTx:"Nouvelle transaction",desc:"Description",amount:"Montant",
    save:"Enregistrer",cancel:"Annuler",noTx:"Aucune transaction",
    noTxSub:"Ajoutez votre première transaction",
    searchCur:"Rechercher une devise...",goal:"Objectif",
    goalName:"Nom de l'objectif",goalTarget:"Montant cible",
    goalCurrent:"Montant actuel",addGoal:"+ Nouvel objectif",
    saveGoal:"Créer l'objectif",months:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    fullMonths:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    dark:"Mode sombre",light:"Mode clair",
    profiles:["Étudiant","Salarié","Freelance","Famille","Voyageur","Retraité"],
    profile:"Profil",selectProfile:"Choisir un profil",
    alertHigh:"⚠️ Budget dépassé à",alertMed:"Attention : ",alertOk:"Finances équilibrées ✓",
    catIncome:[
      {id:"salaire",label:"Salaire",icon:"💼"},
      {id:"freelance",label:"Freelance",icon:"💻"},
      {id:"bourse",label:"Bourse / Aide",icon:"🎓"},
      {id:"loyer_recu",label:"Loyer reçu",icon:"🏠"},
      {id:"investissement",label:"Investissement",icon:"📈"},
      {id:"pension",label:"Pension / Retraite",icon:"👴"},
      {id:"allocation",label:"Allocation familiale",icon:"👨‍👩‍👧"},
      {id:"vente",label:"Vente",icon:"🏷️"},
      {id:"remboursement",label:"Remboursement",icon:"↩️"},
      {id:"autre_rev",label:"Autre revenu",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"Loyer / Hypothèque",icon:"🏠"},
      {id:"nourriture",label:"Alimentation",icon:"🛒"},
      {id:"resto",label:"Restaurant / Café",icon:"🍽️"},
      {id:"transport",label:"Transport",icon:"🚌"},
      {id:"voiture",label:"Voiture",icon:"🚗"},
      {id:"voyage",label:"Voyage",icon:"✈️"},
      {id:"sante",label:"Santé / Médecin",icon:"💊"},
      {id:"sport",label:"Sport / Fitness",icon:"💪"},
      {id:"loisirs",label:"Loisirs",icon:"🎮"},
      {id:"abonnements",label:"Abonnements",icon:"📱"},
      {id:"vetements",label:"Vêtements",icon:"👗"},
      {id:"education",label:"Éducation",icon:"📚"},
      {id:"enfants",label:"Enfants",icon:"🧒"},
      {id:"animaux",label:"Animaux",icon:"🐾"},
      {id:"maison",label:"Maison / Déco",icon:"🛋️"},
      {id:"epargne",label:"Épargne",icon:"🐷"},
      {id:"impots",label:"Impôts / Taxes",icon:"📋"},
      {id:"assurance",label:"Assurance",icon:"🛡️"},
      {id:"cadeaux",label:"Cadeaux",icon:"🎁"},
      {id:"autre_dep",label:"Autre dépense",icon:"📦"},
    ],
  },
  en:{code:"en",flag:"🇬🇧",name:"English",dir:"ltr",
    appName:"FlowBudget",appSub:"Personal finance manager",
    tabs:["Dashboard","Transactions","Goals","Analytics"],
    income:"Income",expense:"Expenses",balance:"Balance",savings:"Savings",
    spendRate:"Spending rate",addBtn:"+ New transaction",
    newTx:"New transaction",desc:"Description",amount:"Amount",
    save:"Save",cancel:"Cancel",noTx:"No transactions",
    noTxSub:"Add your first transaction",
    searchCur:"Search currency...",goal:"Goal",
    goalName:"Goal name",goalTarget:"Target amount",
    goalCurrent:"Current amount",addGoal:"+ New goal",
    saveGoal:"Create goal",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    fullMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],
    dark:"Dark mode",light:"Light mode",
    profiles:["Student","Employee","Freelancer","Family","Traveller","Retired"],
    profile:"Profile",selectProfile:"Select profile",
    alertHigh:"⚠️ Budget exceeded at",alertMed:"Warning: ",alertOk:"Finances balanced ✓",
    catIncome:[
      {id:"salaire",label:"Salary",icon:"💼"},{id:"freelance",label:"Freelance",icon:"💻"},
      {id:"bourse",label:"Scholarship",icon:"🎓"},{id:"loyer_recu",label:"Rental income",icon:"🏠"},
      {id:"investissement",label:"Investment",icon:"📈"},{id:"pension",label:"Pension",icon:"👴"},
      {id:"allocation",label:"Family allowance",icon:"👨‍👩‍👧"},{id:"vente",label:"Sale",icon:"🏷️"},
      {id:"remboursement",label:"Refund",icon:"↩️"},{id:"autre_rev",label:"Other income",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"Rent / Mortgage",icon:"🏠"},{id:"nourriture",label:"Groceries",icon:"🛒"},
      {id:"resto",label:"Restaurant / Café",icon:"🍽️"},{id:"transport",label:"Transport",icon:"🚌"},
      {id:"voiture",label:"Car",icon:"🚗"},{id:"voyage",label:"Travel",icon:"✈️"},
      {id:"sante",label:"Health",icon:"💊"},{id:"sport",label:"Sport / Fitness",icon:"💪"},
      {id:"loisirs",label:"Leisure",icon:"🎮"},{id:"abonnements",label:"Subscriptions",icon:"📱"},
      {id:"vetements",label:"Clothing",icon:"👗"},{id:"education",label:"Education",icon:"📚"},
      {id:"enfants",label:"Children",icon:"🧒"},{id:"animaux",label:"Pets",icon:"🐾"},
      {id:"maison",label:"Home / Décor",icon:"🛋️"},{id:"epargne",label:"Savings",icon:"🐷"},
      {id:"impots",label:"Taxes",icon:"📋"},{id:"assurance",label:"Insurance",icon:"🛡️"},
      {id:"cadeaux",label:"Gifts",icon:"🎁"},{id:"autre_dep",label:"Other",icon:"📦"},
    ],
  },
  es:{code:"es",flag:"🇪🇸",name:"Español",dir:"ltr",
    appName:"FlowBudget",appSub:"Gestión financiera personal",
    tabs:["Panel","Transacciones","Objetivos","Análisis"],
    income:"Ingresos",expense:"Gastos",balance:"Saldo",savings:"Ahorros",
    spendRate:"Tasa de gasto",addBtn:"+ Nueva transacción",
    newTx:"Nueva transacción",desc:"Descripción",amount:"Importe",
    save:"Guardar",cancel:"Cancelar",noTx:"Sin transacciones",
    noTxSub:"Agrega tu primera transacción",
    searchCur:"Buscar divisa...",goal:"Objetivo",
    goalName:"Nombre del objetivo",goalTarget:"Importe objetivo",
    goalCurrent:"Importe actual",addGoal:"+ Nuevo objetivo",
    saveGoal:"Crear objetivo",months:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    fullMonths:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    dark:"Modo oscuro",light:"Modo claro",
    profiles:["Estudiante","Empleado","Freelance","Familia","Viajero","Jubilado"],
    profile:"Perfil",selectProfile:"Seleccionar perfil",
    alertHigh:"⚠️ Presupuesto superado al",alertMed:"Atención: ",alertOk:"Finanzas equilibradas ✓",
    catIncome:[
      {id:"salaire",label:"Salario",icon:"💼"},{id:"freelance",label:"Freelance",icon:"💻"},
      {id:"bourse",label:"Beca",icon:"🎓"},{id:"loyer_recu",label:"Alquiler recibido",icon:"🏠"},
      {id:"investissement",label:"Inversión",icon:"📈"},{id:"pension",label:"Pensión",icon:"👴"},
      {id:"allocation",label:"Ayuda familiar",icon:"👨‍👩‍👧"},{id:"vente",label:"Venta",icon:"🏷️"},
      {id:"remboursement",label:"Reembolso",icon:"↩️"},{id:"autre_rev",label:"Otro ingreso",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"Alquiler",icon:"🏠"},{id:"nourriture",label:"Alimentación",icon:"🛒"},
      {id:"resto",label:"Restaurante",icon:"🍽️"},{id:"transport",label:"Transporte",icon:"🚌"},
      {id:"voiture",label:"Coche",icon:"🚗"},{id:"voyage",label:"Viajes",icon:"✈️"},
      {id:"sante",label:"Salud",icon:"💊"},{id:"sport",label:"Deporte",icon:"💪"},
      {id:"loisirs",label:"Ocio",icon:"🎮"},{id:"abonnements",label:"Suscripciones",icon:"📱"},
      {id:"vetements",label:"Ropa",icon:"👗"},{id:"education",label:"Educación",icon:"📚"},
      {id:"enfants",label:"Hijos",icon:"🧒"},{id:"animaux",label:"Mascotas",icon:"🐾"},
      {id:"maison",label:"Hogar",icon:"🛋️"},{id:"epargne",label:"Ahorros",icon:"🐷"},
      {id:"impots",label:"Impuestos",icon:"📋"},{id:"assurance",label:"Seguro",icon:"🛡️"},
      {id:"cadeaux",label:"Regalos",icon:"🎁"},{id:"autre_dep",label:"Otro",icon:"📦"},
    ],
  },
  ar:{code:"ar",flag:"🇸🇦",name:"العربية",dir:"rtl",
    appName:"FlowBudget",appSub:"إدارة الشؤون المالية الشخصية",
    tabs:["لوحة التحكم","المعاملات","الأهداف","التحليلات"],
    income:"الدخل",expense:"المصاريف",balance:"الرصيد",savings:"المدخرات",
    spendRate:"معدل الإنفاق",addBtn:"+ معاملة جديدة",
    newTx:"معاملة جديدة",desc:"الوصف",amount:"المبلغ",
    save:"حفظ",cancel:"إلغاء",noTx:"لا توجد معاملات",
    noTxSub:"أضف أول معاملة لك",
    searchCur:"ابحث عن عملة...",goal:"هدف",
    goalName:"اسم الهدف",goalTarget:"المبلغ المستهدف",
    goalCurrent:"المبلغ الحالي",addGoal:"+ هدف جديد",
    saveGoal:"إنشاء هدف",months:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    fullMonths:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    dark:"الوضع الداكن",light:"الوضع الفاتح",
    profiles:["طالب","موظف","مستقل","عائلة","مسافر","متقاعد"],
    profile:"الملف الشخصي",selectProfile:"اختر ملفاً",
    alertHigh:"⚠️ تجاوز الميزانية",alertMed:"تحذير: ",alertOk:"الأوضاع المالية متوازنة ✓",
    catIncome:[
      {id:"salaire",label:"راتب",icon:"💼"},{id:"freelance",label:"عمل حر",icon:"💻"},
      {id:"bourse",label:"منحة",icon:"🎓"},{id:"loyer_recu",label:"إيجار مستلم",icon:"🏠"},
      {id:"investissement",label:"استثمار",icon:"📈"},{id:"pension",label:"معاش",icon:"👴"},
      {id:"allocation",label:"إعانة عائلية",icon:"👨‍👩‍👧"},{id:"vente",label:"بيع",icon:"🏷️"},
      {id:"remboursement",label:"استرداد",icon:"↩️"},{id:"autre_rev",label:"دخل آخر",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"إيجار",icon:"🏠"},{id:"nourriture",label:"طعام",icon:"🛒"},
      {id:"resto",label:"مطعم",icon:"🍽️"},{id:"transport",label:"نقل",icon:"🚌"},
      {id:"voiture",label:"سيارة",icon:"🚗"},{id:"voyage",label:"سفر",icon:"✈️"},
      {id:"sante",label:"صحة",icon:"💊"},{id:"sport",label:"رياضة",icon:"💪"},
      {id:"loisirs",label:"ترفيه",icon:"🎮"},{id:"abonnements",label:"اشتراكات",icon:"📱"},
      {id:"vetements",label:"ملابس",icon:"👗"},{id:"education",label:"تعليم",icon:"📚"},
      {id:"enfants",label:"أطفال",icon:"🧒"},{id:"animaux",label:"حيوانات أليفة",icon:"🐾"},
      {id:"maison",label:"منزل",icon:"🛋️"},{id:"epargne",label:"مدخرات",icon:"🐷"},
      {id:"impots",label:"ضرائب",icon:"📋"},{id:"assurance",label:"تأمين",icon:"🛡️"},
      {id:"cadeaux",label:"هدايا",icon:"🎁"},{id:"autre_dep",label:"أخرى",icon:"📦"},
    ],
  },
  zh:{code:"zh",flag:"🇨🇳",name:"中文",dir:"ltr",
    appName:"FlowBudget",appSub:"个人财务管理",
    tabs:["仪表盘","交易","目标","分析"],
    income:"收入",expense:"支出",balance:"结余",savings:"储蓄",
    spendRate:"消费比率",addBtn:"+ 新交易",
    newTx:"新交易",desc:"描述",amount:"金额",
    save:"保存",cancel:"取消",noTx:"暂无交易",
    noTxSub:"添加您的第一笔交易",
    searchCur:"搜索货币...",goal:"目标",
    goalName:"目标名称",goalTarget:"目标金额",
    goalCurrent:"当前金额",addGoal:"+ 新目标",
    saveGoal:"创建目标",months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    fullMonths:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    dark:"暗色模式",light:"亮色模式",
    profiles:["学生","员工","自由职业","家庭","旅行者","退休"],
    profile:"个人资料",selectProfile:"选择资料",
    alertHigh:"⚠️ 预算超出",alertMed:"注意：",alertOk:"财务平衡 ✓",
    catIncome:[
      {id:"salaire",label:"工资",icon:"💼"},{id:"freelance",label:"自由职业",icon:"💻"},
      {id:"bourse",label:"奖学金",icon:"🎓"},{id:"loyer_recu",label:"租金收入",icon:"🏠"},
      {id:"investissement",label:"投资",icon:"📈"},{id:"pension",label:"养老金",icon:"👴"},
      {id:"allocation",label:"家庭补贴",icon:"👨‍👩‍👧"},{id:"vente",label:"销售",icon:"🏷️"},
      {id:"remboursement",label:"退款",icon:"↩️"},{id:"autre_rev",label:"其他收入",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"房租",icon:"🏠"},{id:"nourriture",label:"食品",icon:"🛒"},
      {id:"resto",label:"餐厅",icon:"🍽️"},{id:"transport",label:"交通",icon:"🚌"},
      {id:"voiture",label:"汽车",icon:"🚗"},{id:"voyage",label:"旅行",icon:"✈️"},
      {id:"sante",label:"医疗",icon:"💊"},{id:"sport",label:"运动",icon:"💪"},
      {id:"loisirs",label:"娱乐",icon:"🎮"},{id:"abonnements",label:"订阅",icon:"📱"},
      {id:"vetements",label:"服装",icon:"👗"},{id:"education",label:"教育",icon:"📚"},
      {id:"enfants",label:"子女",icon:"🧒"},{id:"animaux",label:"宠物",icon:"🐾"},
      {id:"maison",label:"家居",icon:"🛋️"},{id:"epargne",label:"储蓄",icon:"🐷"},
      {id:"impots",label:"税费",icon:"📋"},{id:"assurance",label:"保险",icon:"🛡️"},
      {id:"cadeaux",label:"礼品",icon:"🎁"},{id:"autre_dep",label:"其他",icon:"📦"},
    ],
  },
  pt:{code:"pt",flag:"🇵🇹",name:"Português",dir:"ltr",
    appName:"FlowBudget",appSub:"Gestão financeira pessoal",
    tabs:["Painel","Transações","Objetivos","Análise"],
    income:"Receitas",expense:"Despesas",balance:"Saldo",savings:"Poupanças",
    spendRate:"Taxa de gasto",addBtn:"+ Nova transação",
    newTx:"Nova transação",desc:"Descrição",amount:"Valor",
    save:"Guardar",cancel:"Cancelar",noTx:"Sem transações",
    noTxSub:"Adicione a sua primeira transação",
    searchCur:"Pesquisar moeda...",goal:"Objetivo",
    goalName:"Nome do objetivo",goalTarget:"Valor alvo",
    goalCurrent:"Valor atual",addGoal:"+ Novo objetivo",
    saveGoal:"Criar objetivo",months:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    fullMonths:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
    dark:"Modo escuro",light:"Modo claro",
    profiles:["Estudante","Funcionário","Freelancer","Família","Viajante","Reformado"],
    profile:"Perfil",selectProfile:"Escolher perfil",
    alertHigh:"⚠️ Orçamento excedido em",alertMed:"Atenção: ",alertOk:"Finanças equilibradas ✓",
    catIncome:[
      {id:"salaire",label:"Salário",icon:"💼"},{id:"freelance",label:"Freelance",icon:"💻"},
      {id:"bourse",label:"Bolsa",icon:"🎓"},{id:"loyer_recu",label:"Renda recebida",icon:"🏠"},
      {id:"investissement",label:"Investimento",icon:"📈"},{id:"pension",label:"Pensão",icon:"👴"},
      {id:"allocation",label:"Abono familiar",icon:"👨‍👩‍👧"},{id:"vente",label:"Venda",icon:"🏷️"},
      {id:"remboursement",label:"Reembolso",icon:"↩️"},{id:"autre_rev",label:"Outro",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"Renda",icon:"🏠"},{id:"nourriture",label:"Alimentação",icon:"🛒"},
      {id:"resto",label:"Restaurante",icon:"🍽️"},{id:"transport",label:"Transporte",icon:"🚌"},
      {id:"voiture",label:"Carro",icon:"🚗"},{id:"voyage",label:"Viagem",icon:"✈️"},
      {id:"sante",label:"Saúde",icon:"💊"},{id:"sport",label:"Desporto",icon:"💪"},
      {id:"loisirs",label:"Lazer",icon:"🎮"},{id:"abonnements",label:"Subscrições",icon:"📱"},
      {id:"vetements",label:"Roupa",icon:"👗"},{id:"education",label:"Educação",icon:"📚"},
      {id:"enfants",label:"Filhos",icon:"🧒"},{id:"animaux",label:"Animais",icon:"🐾"},
      {id:"maison",label:"Casa",icon:"🛋️"},{id:"epargne",label:"Poupança",icon:"🐷"},
      {id:"impots",label:"Impostos",icon:"📋"},{id:"assurance",label:"Seguro",icon:"🛡️"},
      {id:"cadeaux",label:"Presentes",icon:"🎁"},{id:"autre_dep",label:"Outro",icon:"📦"},
    ],
  },
  ru:{code:"ru",flag:"🇷🇺",name:"Русский",dir:"ltr",
    appName:"FlowBudget",appSub:"Личный финансовый менеджер",
    tabs:["Обзор","Транзакции","Цели","Аналитика"],
    income:"Доходы",expense:"Расходы",balance:"Баланс",savings:"Сбережения",
    spendRate:"Процент трат",addBtn:"+ Новая транзакция",
    newTx:"Новая транзакция",desc:"Описание",amount:"Сумма",
    save:"Сохранить",cancel:"Отмена",noTx:"Нет транзакций",
    noTxSub:"Добавьте первую транзакцию",
    searchCur:"Поиск валюты...",goal:"Цель",
    goalName:"Название цели",goalTarget:"Целевая сумма",
    goalCurrent:"Текущая сумма",addGoal:"+ Новая цель",
    saveGoal:"Создать цель",months:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],
    fullMonths:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
    dark:"Тёмная тема",light:"Светлая тема",
    profiles:["Студент","Сотрудник","Фрилансер","Семья","Путешественник","Пенсионер"],
    profile:"Профиль",selectProfile:"Выбрать профиль",
    alertHigh:"⚠️ Бюджет превышен на",alertMed:"Внимание: ",alertOk:"Финансы сбалансированы ✓",
    catIncome:[
      {id:"salaire",label:"Зарплата",icon:"💼"},{id:"freelance",label:"Фриланс",icon:"💻"},
      {id:"bourse",label:"Стипендия",icon:"🎓"},{id:"loyer_recu",label:"Арендный доход",icon:"🏠"},
      {id:"investissement",label:"Инвестиции",icon:"📈"},{id:"pension",label:"Пенсия",icon:"👴"},
      {id:"allocation",label:"Пособие",icon:"👨‍👩‍👧"},{id:"vente",label:"Продажа",icon:"🏷️"},
      {id:"remboursement",label:"Возврат",icon:"↩️"},{id:"autre_rev",label:"Другой доход",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"Аренда",icon:"🏠"},{id:"nourriture",label:"Продукты",icon:"🛒"},
      {id:"resto",label:"Кафе / Ресторан",icon:"🍽️"},{id:"transport",label:"Транспорт",icon:"🚌"},
      {id:"voiture",label:"Автомобиль",icon:"🚗"},{id:"voyage",label:"Путешествия",icon:"✈️"},
      {id:"sante",label:"Здоровье",icon:"💊"},{id:"sport",label:"Спорт",icon:"💪"},
      {id:"loisirs",label:"Досуг",icon:"🎮"},{id:"abonnements",label:"Подписки",icon:"📱"},
      {id:"vetements",label:"Одежда",icon:"👗"},{id:"education",label:"Образование",icon:"📚"},
      {id:"enfants",label:"Дети",icon:"🧒"},{id:"animaux",label:"Животные",icon:"🐾"},
      {id:"maison",label:"Дом",icon:"🛋️"},{id:"epargne",label:"Сбережения",icon:"🐷"},
      {id:"impots",label:"Налоги",icon:"📋"},{id:"assurance",label:"Страховка",icon:"🛡️"},
      {id:"cadeaux",label:"Подарки",icon:"🎁"},{id:"autre_dep",label:"Другое",icon:"📦"},
    ],
  },
  ja:{code:"ja",flag:"🇯🇵",name:"日本語",dir:"ltr",
    appName:"FlowBudget",appSub:"個人財務管理",
    tabs:["ダッシュボード","取引","目標","分析"],
    income:"収入",expense:"支出",balance:"残高",savings:"貯蓄",
    spendRate:"支出率",addBtn:"+ 新規取引",
    newTx:"新規取引",desc:"説明",amount:"金額",
    save:"保存",cancel:"キャンセル",noTx:"取引なし",
    noTxSub:"最初の取引を追加してください",
    searchCur:"通貨を検索...",goal:"目標",
    goalName:"目標名",goalTarget:"目標金額",
    goalCurrent:"現在の金額",addGoal:"+ 新しい目標",
    saveGoal:"目標を作成",months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    fullMonths:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    dark:"ダークモード",light:"ライトモード",
    profiles:["学生","会社員","フリーランス","家族","旅行者","退職者"],
    profile:"プロフィール",selectProfile:"プロフィールを選択",
    alertHigh:"⚠️ 予算超過",alertMed:"注意：",alertOk:"財務バランス良好 ✓",
    catIncome:[
      {id:"salaire",label:"給与",icon:"💼"},{id:"freelance",label:"フリーランス",icon:"💻"},
      {id:"bourse",label:"奨学金",icon:"🎓"},{id:"loyer_recu",label:"家賃収入",icon:"🏠"},
      {id:"investissement",label:"投資",icon:"📈"},{id:"pension",label:"年金",icon:"👴"},
      {id:"allocation",label:"家族手当",icon:"👨‍👩‍👧"},{id:"vente",label:"売却",icon:"🏷️"},
      {id:"remboursement",label:"払い戻し",icon:"↩️"},{id:"autre_rev",label:"その他収入",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"家賃",icon:"🏠"},{id:"nourriture",label:"食料品",icon:"🛒"},
      {id:"resto",label:"外食",icon:"🍽️"},{id:"transport",label:"交通費",icon:"🚌"},
      {id:"voiture",label:"自動車",icon:"🚗"},{id:"voyage",label:"旅行",icon:"✈️"},
      {id:"sante",label:"医療",icon:"💊"},{id:"sport",label:"スポーツ",icon:"💪"},
      {id:"loisirs",label:"娯楽",icon:"🎮"},{id:"abonnements",label:"サブスクリプション",icon:"📱"},
      {id:"vetements",label:"衣類",icon:"👗"},{id:"education",label:"教育",icon:"📚"},
      {id:"enfants",label:"子育て",icon:"🧒"},{id:"animaux",label:"ペット",icon:"🐾"},
      {id:"maison",label:"インテリア",icon:"🛋️"},{id:"epargne",label:"貯蓄",icon:"🐷"},
      {id:"impots",label:"税金",icon:"📋"},{id:"assurance",label:"保険",icon:"🛡️"},
      {id:"cadeaux",label:"贈り物",icon:"🎁"},{id:"autre_dep",label:"その他",icon:"📦"},
    ],
  },
  ko:{code:"ko",flag:"🇰🇷",name:"한국어",dir:"ltr",
    appName:"FlowBudget",appSub:"개인 재무 관리",
    tabs:["대시보드","거래","목표","분석"],
    income:"수입",expense:"지출",balance:"잔액",savings:"저축",
    spendRate:"지출 비율",addBtn:"+ 새 거래",
    newTx:"새 거래",desc:"설명",amount:"금액",
    save:"저장",cancel:"취소",noTx:"거래 없음",
    noTxSub:"첫 거래를 추가하세요",
    searchCur:"통화 검색...",goal:"목표",
    goalName:"목표 이름",goalTarget:"목표 금액",
    goalCurrent:"현재 금액",addGoal:"+ 새 목표",
    saveGoal:"목표 만들기",months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    fullMonths:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    dark:"다크 모드",light:"라이트 모드",
    profiles:["학생","직장인","프리랜서","가족","여행자","은퇴자"],
    profile:"프로필",selectProfile:"프로필 선택",
    alertHigh:"⚠️ 예산 초과",alertMed:"주의：",alertOk:"재정 균형 ✓",
    catIncome:[
      {id:"salaire",label:"급여",icon:"💼"},{id:"freelance",label:"프리랜서",icon:"💻"},
      {id:"bourse",label:"장학금",icon:"🎓"},{id:"loyer_recu",label:"임대 수입",icon:"🏠"},
      {id:"investissement",label:"투자",icon:"📈"},{id:"pension",label:"연금",icon:"👴"},
      {id:"allocation",label:"가족 수당",icon:"👨‍👩‍👧"},{id:"vente",label:"판매",icon:"🏷️"},
      {id:"remboursement",label:"환불",icon:"↩️"},{id:"autre_rev",label:"기타 수입",icon:"➕"},
    ],
    catExpense:[
      {id:"loyer",label:"임대료",icon:"🏠"},{id:"nourriture",label:"식료품",icon:"🛒"},
      {id:"resto",label:"외식",icon:"🍽️"},{id:"transport",label:"교통",icon:"🚌"},
      {id:"voiture",label:"자동차",icon:"🚗"},{id:"voyage",label:"여행",icon:"✈️"},
      {id:"sante",label:"의료",icon:"💊"},{id:"sport",label:"운동",icon:"💪"},
      {id:"loisirs",label:"여가",icon:"🎮"},{id:"abonnements",label:"구독",icon:"📱"},
      {id:"vetements",label:"의류",icon:"👗"},{id:"education",label:"교육",icon:"📚"},
      {id:"enfants",label:"육아",icon:"🧒"},{id:"animaux",label:"반려동물",icon:"🐾"},
      {id:"maison",label:"홈인테리어",icon:"🛋️"},{id:"epargne",label:"저축",icon:"🐷"},
      {id:"impots",label:"세금",icon:"📋"},{id:"assurance",label:"보험",icon:"🛡️"},
      {id:"cadeaux",label:"선물",icon:"🎁"},{id:"autre_dep",label:"기타",icon:"📦"},
    ],
  },
};

const EXPENSE_COLORS = ["#6366f1","#8b5cf6","#a78bfa","#ec4899","#f43f5e","#f97316","#eab308","#22c55e","#14b8a6","#06b6d4","#3b82f6","#84cc16","#d946ef","#fb923c","#34d399","#f87171","#60a5fa","#fbbf24","#a3e635","#94a3b8"];
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
let nextId = 10;

const DEMO_TX = [
  {id:1,type:"revenu",category:"salaire",label:"Salaire",amount:2800,month:currentMonth,year:currentYear},
  {id:2,type:"depense",category:"loyer",label:"Loyer",amount:850,month:currentMonth,year:currentYear},
  {id:3,type:"depense",category:"nourriture",label:"Supermarché",amount:120,month:currentMonth,year:currentYear},
  {id:4,type:"depense",category:"transport",label:"Transports en commun",amount:75,month:currentMonth,year:currentYear},
  {id:5,type:"depense",category:"abonnements",label:"Netflix + Spotify",amount:28,month:currentMonth,year:currentYear},
  {id:6,type:"depense",category:"resto",label:"Restaurant",amount:55,month:currentMonth,year:currentYear},
  {id:7,type:"revenu",category:"freelance",label:"Mission freelance",amount:400,month:currentMonth,year:currentYear},
  {id:8,type:"depense",category:"sport",label:"Salle de sport",amount:35,month:currentMonth,year:currentYear},
  {id:9,type:"depense",category:"epargne",label:"Épargne mensuelle",amount:200,month:currentMonth,year:currentYear},
];

const DEMO_GOALS = [
  {id:1,name:"Voyage Japon ✈️",target:3000,current:850},
  {id:2,name:"Fond d'urgence 🛡️",target:5000,current:2200},
  {id:3,name:"Nouveau PC 💻",target:1200,current:400},
];

export default function FlowBudget() {
  const [transactions, setTransactions] = useState(DEMO_TX);
  const [goals, setGoals] = useState(DEMO_GOALS);
  const [selMonth, setSelMonth] = useState(currentMonth);
  const [currency, setCurrency] = useState(CURRENCIES.find(c=>c.code==="EUR"));
  const [lang, setLang] = useState(LANGS.fr);
  const [dark, setDark] = useState(true);
  const [profile, setProfile] = useState(0);
  const [tab, setTab] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [form, setForm] = useState({type:"depense",category:"nourriture",label:"",amount:""});
  const [goalForm, setGoalForm] = useState({name:"",target:"",current:""});
  const [showCur, setShowCur] = useState(false);
  const [showLng, setShowLng] = useState(false);
  const [showProf, setShowProf] = useState(false);
  const [curSearch, setCurSearch] = useState("");
  const curRef = useRef(null);
  const lngRef = useRef(null);
  const profRef = useRef(null);
  const t = lang;

  // Theme colors
  const th = useMemo(() => dark ? {
    bg:"#0a0a0f", card:"#12121a", border:"rgba(255,255,255,0.07)",
    text:"#f1f5f9", sub:"#64748b", muted:"#334155",
    accent:"#6366f1", accentLight:"rgba(99,102,241,0.15)",
    success:"#22c55e", danger:"#f43f5e", warning:"#f59e0b",
    input:"rgba(255,255,255,0.05)", inputBorder:"rgba(255,255,255,0.1)",
    surface:"rgba(255,255,255,0.03)",
  } : {
    bg:"#f8fafc", card:"#ffffff", border:"rgba(0,0,0,0.08)",
    text:"#0f172a", sub:"#64748b", muted:"#cbd5e1",
    accent:"#6366f1", accentLight:"rgba(99,102,241,0.1)",
    success:"#16a34a", danger:"#dc2626", warning:"#d97706",
    input:"rgba(0,0,0,0.04)", inputBorder:"rgba(0,0,0,0.12)",
    surface:"rgba(0,0,0,0.02)",
  }, [dark]);

  useEffect(() => {
    const h = (e) => {
      if (curRef.current && !curRef.current.contains(e.target)) setShowCur(false);
      if (lngRef.current && !lngRef.current.contains(e.target)) setShowLng(false);
      if (profRef.current && !profRef.current.contains(e.target)) setShowProf(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const fmt = (v) => `${Math.abs(v).toLocaleString()} ${currency.symbol}`;
  const filtered = useMemo(() => transactions.filter(tx=>tx.month===selMonth && tx.year===currentYear), [transactions, selMonth]);
  const totalIn = filtered.filter(tx=>tx.type==="revenu").reduce((s,tx)=>s+tx.amount,0);
  const totalOut = filtered.filter(tx=>tx.type==="depense").reduce((s,tx)=>s+tx.amount,0);
  const bal = totalIn - totalOut;
  const ratio = totalIn > 0 ? Math.min((totalOut/totalIn)*100,100) : 0;

  const byCat = useMemo(() => {
    const map = {};
    filtered.filter(tx=>tx.type==="depense").forEach(tx=>{ map[tx.category]=(map[tx.category]||0)+tx.amount; });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([cat,val]) => {
      const info = t.catExpense.find(c=>c.id===cat)||{label:cat,icon:"📦"};
      return {name:`${info.icon} ${info.label}`, value:val, id:cat};
    });
  }, [filtered, t]);

  const areaData = t.months.map((m,i) => {
    const rev = transactions.filter(tx=>tx.month===i&&tx.year===currentYear&&tx.type==="revenu").reduce((s,tx)=>s+tx.amount,0);
    const dep = transactions.filter(tx=>tx.month===i&&tx.year===currentYear&&tx.type==="depense").reduce((s,tx)=>s+tx.amount,0);
    return {month:m, [t.income]:rev, [t.expense]:dep};
  });

  const catOpts = form.type==="revenu" ? t.catIncome : t.catExpense;

  const addTx = () => {
    if (!form.label || !form.amount || isNaN(parseFloat(form.amount))) return;
    setTransactions(p=>[...p,{id:nextId++,type:form.type,category:form.category,label:form.label,amount:parseFloat(form.amount),month:selMonth,year:currentYear}]);
    setForm({type:"depense",category:"nourriture",label:"",amount:""});
    setShowForm(false);
  };

  const addGoal = () => {
    if (!goalForm.name || !goalForm.target) return;
    setGoals(p=>[...p,{id:nextId++,name:goalForm.name,target:parseFloat(goalForm.target),current:parseFloat(goalForm.current)||0}]);
    setGoalForm({name:"",target:"",current:""});
    setShowGoalForm(false);
  };

  const filteredCur = useMemo(() => CURRENCIES.filter(c=>
    c.label.toLowerCase().includes(curSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(curSearch.toLowerCase()) ||
    c.symbol.toLowerCase().includes(curSearch.toLowerCase())
  ), [curSearch]);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Outfit',sans-serif;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:${th.muted};border-radius:2px;}
    .btn{cursor:pointer;border:none;font-family:'Outfit',sans-serif;font-weight:600;transition:all 0.18s;border-radius:12px;}
    .btn:hover{filter:brightness(1.1);transform:translateY(-1px);}
    .btn:active{transform:translateY(0);}
    .inp{background:${th.input};border:1px solid ${th.inputBorder};border-radius:10px;padding:10px 14px;color:${th.text};font-family:'Outfit',sans-serif;font-size:14px;width:100%;outline:none;transition:border 0.18s;}
    .inp:focus{border-color:${th.accent};}
    select.inp option{background:${th.card};color:${th.text};}
    .card{background:${th.card};border:1px solid ${th.border};border-radius:18px;}
    .tab-btn{cursor:pointer;border:none;background:transparent;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;color:${th.sub};padding:8px 18px;border-radius:10px;transition:all 0.18s;white-space:nowrap;}
    .tab-btn.active{background:${th.accentLight};color:${th.accent};}
    .tx-row{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:12px;background:${th.surface};border:1px solid ${th.border};margin-bottom:8px;transition:all 0.15s;}
    .tx-row:hover{background:${th.accentLight};}
    .del-btn{opacity:0;cursor:pointer;background:none;border:none;color:${th.danger};font-size:14px;padding:3px 7px;border-radius:6px;transition:opacity 0.15s;}
    .tx-row:hover .del-btn{opacity:1;}
    .mbtn{cursor:pointer;padding:5px 11px;border-radius:8px;font-size:11px;font-weight:700;border:none;font-family:'JetBrains Mono',monospace;white-space:nowrap;transition:all 0.13s;}
    .drop{position:absolute;z-index:500;background:${th.card};border:1px solid ${th.border};border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.3);}
    .di{padding:9px 16px;cursor:pointer;font-size:13px;color:${th.text};display:flex;justify-content:space-between;align-items:center;gap:10px;transition:background 0.1s;}
    .di:hover{background:${th.accentLight};}
    .di.sel{background:${th.accentLight};color:${th.accent};}
    .pbar{height:6px;background:${th.muted};border-radius:99px;overflow:hidden;}
    .pfill{height:100%;border-radius:99px;transition:width 0.7s cubic-bezier(0.34,1.56,0.64,1);}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp 0.28s ease}
    @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    .si{animation:slideIn 0.22s ease}
    .goal-card{background:${th.surface};border:1px solid ${th.border};border-radius:14px;padding:16px;margin-bottom:10px;}
    .mono{font-family:'JetBrains Mono',monospace;}
  `;

  return (
    <div dir={t.dir} style={{minHeight:"100vh",background:th.bg,color:th.text,fontFamily:"'Outfit',sans-serif"}}>
      <style>{css}</style>

      {/* ── SIDEBAR / TOP NAV ── */}
      <div style={{maxWidth:980,margin:"0 auto",padding:"0 20px"}}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"22px 0 18px",borderBottom:`1px solid ${th.border}`,flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,borderRadius:12,background:`linear-gradient(135deg,${th.accent},#8b5cf6)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:`0 4px 14px rgba(99,102,241,0.4)`}}>💰</div>
            <div>
              <div style={{fontSize:18,fontWeight:800,letterSpacing:"-0.5px"}}>{t.appName}</div>
              <div style={{fontSize:11,color:th.sub}}>{t.appSub}</div>
            </div>
          </div>

          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {/* Profile */}
            <div ref={profRef} style={{position:"relative"}}>
              <button className="btn" onClick={()=>{setShowProf(v=>!v);setShowLng(false);setShowCur(false);}} style={{background:th.surface,border:`1px solid ${th.border}`,color:th.text,padding:"8px 14px",fontSize:12,display:"flex",alignItems:"center",gap:6}}>
                <span>{t.profiles[profile]}</span><span style={{color:th.sub}}>▾</span>
              </button>
              {showProf && (
                <div className="drop si" style={{top:"calc(100% + 8px)",right:0,minWidth:170}}>
                  {t.profiles.map((p,i)=>(
                    <div key={i} className={`di${profile===i?" sel":""}`} onClick={()=>{setProfile(i);setShowProf(false);}}>{p}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Lang */}
            <div ref={lngRef} style={{position:"relative"}}>
              <button className="btn" onClick={()=>{setShowLng(v=>!v);setShowCur(false);setShowProf(false);}} style={{background:th.surface,border:`1px solid ${th.border}`,color:th.text,padding:"8px 12px",fontSize:15}}>
                {t.flag}
              </button>
              {showLng && (
                <div className="drop si" style={{top:"calc(100% + 8px)",right:0,minWidth:185,maxHeight:260,overflowY:"auto"}}>
                  {Object.values(LANGS).map(l=>(
                    <div key={l.code} className={`di${lang.code===l.code?" sel":""}`} onClick={()=>{setLang(l);setShowLng(false);}}>
                      <span>{l.flag} {l.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div ref={curRef} style={{position:"relative"}}>
              <button className="btn" onClick={()=>{setShowCur(v=>!v);setShowLng(false);setShowProf(false);}} style={{background:th.surface,border:`1px solid ${th.border}`,color:th.text,padding:"8px 12px",fontSize:12,fontFamily:"'JetBrains Mono',monospace"}}>
                {currency.code} ▾
              </button>
              {showCur && (
                <div className="drop si" style={{top:"calc(100% + 8px)",right:0,minWidth:300,maxHeight:340,display:"flex",flexDirection:"column"}}>
                  <div style={{padding:"10px",borderBottom:`1px solid ${th.border}`}}>
                    <input className="inp" style={{fontSize:12,padding:"7px 10px"}} placeholder={t.searchCurrency} value={curSearch} onChange={e=>setCurSearch(e.target.value)} autoFocus />
                  </div>
                  <div style={{overflowY:"auto",flex:1}}>
                    {filteredCur.map(c=>(
                      <div key={c.code} className={`di${currency.code===c.code?" sel":""}`} onClick={()=>{setCurrency(c);setShowCur(false);setCurSearch("");}}>
                        <span style={{fontSize:12}}>{c.label}</span>
                        <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600,fontSize:11,flexShrink:0}}>{c.code} {c.symbol}</span>
                      </div>
                    ))}
                    {filteredCur.length===0 && <div style={{padding:20,textAlign:"center",color:th.sub,fontSize:13}}>—</div>}
                  </div>
                </div>
              )}
            </div>

            {/* Dark mode */}
            <button className="btn" onClick={()=>setDark(v=>!v)} style={{background:th.surface,border:`1px solid ${th.border}`,color:th.text,padding:"8px 12px",fontSize:15}}>
              {dark?"☀️":"🌙"}
            </button>

            {/* Add button */}
            <button className="btn" onClick={()=>setShowForm(v=>!v)} style={{background:`linear-gradient(135deg,${th.accent},#8b5cf6)`,color:"#fff",padding:"9px 18px",fontSize:13,boxShadow:`0 4px 18px rgba(99,102,241,0.35)`}}>
              {t.addBtn}
            </button>
          </div>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="card si" style={{padding:20,marginTop:16,borderColor:`rgba(99,102,241,0.3)`}}>
            <div style={{fontSize:13,color:th.accent,fontWeight:700,marginBottom:14}}>{t.newTx}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
              <select className="inp" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value,category:e.target.value==="revenu"?t.catIncome[0].id:t.catExpense[0].id}))}>
                <option value="depense">💸 {t.expense}</option>
                <option value="revenu">💰 {t.income}</option>
              </select>
              <select className="inp" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                {catOpts.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8,marginBottom:14}}>
              <input className="inp" placeholder={t.desc+"..."} value={form.label} onChange={e=>setForm(f=>({...f,label:e.target.value}))} />
              <input className="inp" type="number" placeholder={`${t.amount} (${currency.symbol})`} value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTx()} />
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn" onClick={addTx} style={{background:`linear-gradient(135deg,${th.accent},#8b5cf6)`,color:"#fff",padding:"10px",flex:1,fontSize:13}}>{t.save}</button>
              <button className="btn" onClick={()=>setShowForm(false)} style={{background:th.surface,border:`1px solid ${th.border}`,color:th.sub,padding:"10px 16px",fontSize:13}}>{t.cancel}</button>
            </div>
          </div>
        )}

        {/* Month selector */}
        <div style={{display:"flex",gap:4,overflowX:"auto",padding:"16px 0 0",marginBottom:8}}>
          {t.months.map((m,i)=>{
            const has = transactions.some(tx=>tx.month===i&&tx.year===currentYear);
            return (
              <button key={i} className="mbtn" onClick={()=>setSelMonth(i)} style={{
                background:selMonth===i?`linear-gradient(135deg,${th.accent},#8b5cf6)`:has?th.accentLight:th.surface,
                color:selMonth===i?"#fff":has?th.accent:th.sub,
                border:`1px solid ${selMonth===i?"transparent":th.border}`,
                flexShrink:0,
              }}>{m}</button>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:2,padding:"12px 0",overflowX:"auto"}}>
          {t.tabs.map((tb,i)=>(
            <button key={i} className={`tab-btn${tab===i?" active":""}`} onClick={()=>setTab(i)}>{tb}</button>
          ))}
        </div>

        {/* ── TAB 0: DASHBOARD ── */}
        {tab===0 && (
          <div className="fu">
            {/* KPI row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
              {[
                {label:t.income,value:totalIn,color:th.success,icon:"↑",positive:true},
                {label:t.expense,value:totalOut,color:th.danger,icon:"↓",positive:false},
                {label:t.balance,value:bal,color:bal>=0?th.success:th.danger,icon:"=",positive:bal>=0},
                {label:t.spendRate,value:ratio,color:ratio>90?th.danger:ratio>70?th.warning:th.success,icon:"%",isRatio:true},
              ].map(k=>(
                <div key={k.label} className="card" style={{padding:"18px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <span style={{fontSize:11,color:th.sub,fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>{k.label}</span>
                    <span style={{fontSize:11,fontWeight:700,color:k.color,background:k.color+"22",padding:"2px 7px",borderRadius:6}} className="mono">{k.icon}</span>
                  </div>
                  <div style={{fontSize:20,fontWeight:800,color:k.color}} className="mono">
                    {k.isRatio ? `${ratio.toFixed(0)}%` : `${k.value>=0?"+":"-"}${fmt(k.value)}`}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="card" style={{padding:18,marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontSize:13,color:th.sub}}>{ratio>90?t.alertHigh+" "+ratio.toFixed(0)+"%":ratio>70?t.alertMed+ratio.toFixed(0)+"%":t.alertOk}</span>
                <span style={{fontSize:13,fontWeight:700,color:ratio>90?th.danger:ratio>70?th.warning:th.success}} className="mono">{ratio.toFixed(0)}%</span>
              </div>
              <div className="pbar">
                <div className="pfill" style={{width:`${ratio}%`,background:ratio>90?`linear-gradient(90deg,${th.danger},#ff6b6b)`:ratio>70?`linear-gradient(90deg,${th.warning},#fcd34d)`:`linear-gradient(90deg,${th.accent},#8b5cf6)`}} />
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {/* Pie chart */}
              {byCat.length>0 && (
                <div className="card" style={{padding:18}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:14,color:th.sub}}>{t.expense}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={byCat} cx="50%" cy="50%" innerRadius={40} outerRadius={68} dataKey="value" paddingAngle={2}>
                        {byCat.map((_,i)=><Cell key={i} fill={EXPENSE_COLORS[i%EXPENSE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v)=>fmt(v)} contentStyle={{background:th.card,border:`1px solid ${th.border}`,borderRadius:10,fontFamily:"Outfit",fontSize:12}} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{marginTop:10}}>
                    {byCat.slice(0,5).map((d,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{width:7,height:7,borderRadius:"50%",background:EXPENSE_COLORS[i%EXPENSE_COLORS.length],flexShrink:0}} />
                          <span style={{fontSize:12,color:th.sub}}>{d.name}</span>
                        </div>
                        <span style={{fontSize:12,fontWeight:700}} className="mono">{fmt(d.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent transactions */}
              <div className="card" style={{padding:18}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:14,color:th.sub}}>{t.tabs[1]}</div>
                {filtered.length===0 ? (
                  <div style={{textAlign:"center",padding:"30px 0",color:th.sub}}>
                    <div style={{fontSize:28,marginBottom:8}}>🗒️</div>
                    <div style={{fontSize:13}}>{t.noTx}</div>
                  </div>
                ) : (
                  [...filtered].reverse().slice(0,5).map(tx=>{
                    const cats = tx.type==="revenu"?t.catIncome:t.catExpense;
                    const cat = cats.find(c=>c.id===tx.category)||{icon:"📦",label:tx.category};
                    return (
                      <div key={tx.id} className="tx-row">
                        <div style={{display:"flex",alignItems:"center",gap:9}}>
                          <div style={{width:32,height:32,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,background:tx.type==="revenu"?th.success+"22":th.danger+"22"}}>{cat.icon}</div>
                          <div>
                            <div style={{fontSize:13,fontWeight:500}}>{tx.label}</div>
                            <div style={{fontSize:11,color:th.sub}}>{cat.label}</div>
                          </div>
                        </div>
                        <span style={{fontWeight:700,color:tx.type==="revenu"?th.success:th.danger,fontSize:13}} className="mono">
                          {tx.type==="revenu"?"+":"-"}{fmt(tx.amount)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 1: TRANSACTIONS ── */}
        {tab===1 && (
          <div className="fu">
            {filtered.length===0 ? (
              <div style={{textAlign:"center",padding:"80px 0",color:th.sub}}>
                <div style={{fontSize:48,marginBottom:12}}>🗒️</div>
                <div style={{fontSize:16,fontWeight:600}}>{t.noTx}</div>
                <div style={{fontSize:13,marginTop:6}}>{t.noTxSub}</div>
              </div>
            ) : (
              [...filtered].reverse().map(tx=>{
                const cats = tx.type==="revenu"?t.catIncome:t.catExpense;
                const cat = cats.find(c=>c.id===tx.category)||{icon:"📦",label:tx.category};
                return (
                  <div key={tx.id} className="tx-row">
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:tx.type==="revenu"?th.success+"22":th.danger+"22",flexShrink:0}}>{cat.icon}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:500}}>{tx.label}</div>
                        <div style={{fontSize:11,color:th.sub}}>{cat.label} · {t.months[tx.month]}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontWeight:700,color:tx.type==="revenu"?th.success:th.danger,fontSize:14}} className="mono">
                        {tx.type==="revenu"?"+":"-"}{fmt(tx.amount)}
                      </span>
                      <button className="del-btn" onClick={()=>setTransactions(p=>p.filter(t=>t.id!==tx.id))}>✕</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── TAB 2: GOALS ── */}
        {tab===2 && (
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:14,color:th.sub,fontWeight:600}}>{t.goal}s</div>
              <button className="btn" onClick={()=>setShowGoalForm(v=>!v)} style={{background:th.accentLight,color:th.accent,border:`1px solid ${th.accent}44`,padding:"8px 16px",fontSize:13}}>
                {t.addGoal}
              </button>
            </div>

            {showGoalForm && (
              <div className="card si" style={{padding:18,marginBottom:16,borderColor:`${th.accent}44`}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginBottom:10}}>
                  <input className="inp" placeholder={t.goalName} value={goalForm.name} onChange={e=>setGoalForm(f=>({...f,name:e.target.value}))} />
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <input className="inp" type="number" placeholder={`${t.goalTarget} (${currency.symbol})`} value={goalForm.target} onChange={e=>setGoalForm(f=>({...f,target:e.target.value}))} />
                    <input className="inp" type="number" placeholder={`${t.goalCurrent} (${currency.symbol})`} value={goalForm.current} onChange={e=>setGoalForm(f=>({...f,current:e.target.value}))} />
                  </div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn" onClick={addGoal} style={{background:`linear-gradient(135deg,${th.accent},#8b5cf6)`,color:"#fff",padding:"9px",flex:1,fontSize:13}}>{t.saveGoal}</button>
                  <button className="btn" onClick={()=>setShowGoalForm(false)} style={{background:th.surface,border:`1px solid ${th.border}`,color:th.sub,padding:"9px 14px",fontSize:13}}>{t.cancel}</button>
                </div>
              </div>
            )}

            {goals.map((g,i)=>{
              const pct = Math.min((g.current/g.target)*100,100);
              const remaining = g.target - g.current;
              const color = pct>=100?th.success:pct>60?th.accent:th.warning;
              return (
                <div key={g.id} className="goal-card">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <div style={{fontSize:15,fontWeight:700}}>{g.name}</div>
                      <div style={{fontSize:11,color:th.sub,marginTop:2}}>{fmt(g.current)} / {fmt(g.target)}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:18,fontWeight:800,color}} className="mono">{pct.toFixed(0)}%</div>
                      {pct<100 && <div style={{fontSize:10,color:th.sub,marginTop:2}}>−{fmt(remaining)}</div>}
                      {pct>=100 && <div style={{fontSize:10,color:th.success,marginTop:2}}>✓ Atteint !</div>}
                    </div>
                  </div>
                  <div className="pbar">
                    <div className="pfill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${color},${color}bb)`}} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB 3: ANALYTICS ── */}
        {tab===3 && (
          <div className="fu">
            <div className="card" style={{padding:20,marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:th.sub,marginBottom:16}}>{t.income} vs {t.expense} — {currentYear}</div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={th.success} stopOpacity={0.3}/>
                      <stop offset="100%" stopColor={th.success} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={th.danger} stopOpacity={0.3}/>
                      <stop offset="100%" stopColor={th.danger} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{fill:th.sub,fontSize:11,fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:th.sub,fontSize:11}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:th.card,border:`1px solid ${th.border}`,borderRadius:12,fontFamily:"Outfit",fontSize:12}} formatter={(v)=>fmt(v)}/>
                  <Area type="monotone" dataKey={t.income} stroke={th.success} fill="url(#gi)" strokeWidth={2}/>
                  <Area type="monotone" dataKey={t.expense} stroke={th.danger} fill="url(#ge)" strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card" style={{padding:20,marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:th.sub,marginBottom:16}}>{t.expense} par catégorie</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={byCat.slice(0,8)} layout="vertical" barSize={10}>
                  <XAxis type="number" tick={{fill:th.sub,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" tick={{fill:th.sub,fontSize:11}} width={120} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:th.card,border:`1px solid ${th.border}`,borderRadius:10,fontFamily:"Outfit",fontSize:12}} formatter={(v)=>fmt(v)}/>
                  <Bar dataKey="value" radius={[0,6,6,0]}>
                    {byCat.slice(0,8).map((_,i)=><Cell key={i} fill={EXPENSE_COLORS[i%EXPENSE_COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly recap */}
            <div className="card" style={{padding:20}}>
              <div style={{fontSize:13,fontWeight:600,color:th.sub,marginBottom:14}}>Récap mensuel {currentYear}</div>
              {t.months.map((m,i)=>{
                const rev = transactions.filter(tx=>tx.month===i&&tx.year===currentYear&&tx.type==="revenu").reduce((s,tx)=>s+tx.amount,0);
                const dep = transactions.filter(tx=>tx.month===i&&tx.year===currentYear&&tx.type==="depense").reduce((s,tx)=>s+tx.amount,0);
                const b = rev-dep;
                if (!rev&&!dep) return null;
                return (
                  <div key={m} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${th.border}`}}>
                    <span style={{fontSize:12,color:i===currentMonth?th.accent:th.sub,fontWeight:i===currentMonth?700:400}} className="mono">{m}{i===currentMonth?" ◀":""}</span>
                    <div style={{display:"flex",gap:16}}>
                      <span style={{fontSize:11,color:th.success}} className="mono">+{fmt(rev)}</span>
                      <span style={{fontSize:11,color:th.danger}} className="mono">−{fmt(dep)}</span>
                      <span style={{fontSize:12,fontWeight:700,color:b>=0?th.success:th.danger}} className="mono">{b>=0?"+":"−"}{fmt(Math.abs(b))}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{height:40}}/>
      </div>
    </div>
  );
}
