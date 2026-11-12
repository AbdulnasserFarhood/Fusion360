// ================================================
//  ✏️ كل محتوى الموقع هنا. عدّل النصوص بين علامات " "
//  {price} = السعر   {free} = عدد الدروس المجانية
//  لخط برتقالي تحت كلمة: <span class='scribble'>الكلمة</span>
// ================================================
const SITE = {

  theme: { primary: "#0f2a4a", accent: "#f26b1d", bg: "#f5f7fa" },

  meta: { title: "دورة Fusion 360 بالعربية" },

  brand: {
    name: "RoboGeex Academy",
    logo: "logo.png",
    logoWhite: "logo-white.png"
  },

  contact: {
    whatsapp: "96171171119",
    phoneDisplay: "+961 71 171 119",
    email: "info@robogeex.com",
    partner: "شريك معتمد من Autodesk"
  },

  course: {
    price: 60,
    freeLessons: 8,
    buyUrl: "https://www.robogeex.com/slides/fsn100-autodesk-fusion-360-essentials-25",
    buyMessage: "مرحباً، أريد شراء دورة Fusion 360"
  },

  buttons: { free: "ابدأ مجاناً", buy: "اشترِ الدورة · {price} دولاراً" },

  nav: [
    { label: "المنهج", href: "#curriculum" },
    { label: "الشهادة", href: "#certificate" },
    { label: "المدرّب", href: "#instructor" },
    { label: "السعر", href: "#price" },
    { label: "الأسئلة الشائعة", href: "#faq" }
  ],

  hero: {
    badges: ["دورة مسجّلة بالعربية", "للمبتدئين", "شهادة من Autodesk"],
    title: "تعلّم <span class='scribble'>Fusion 360</span> بالعربي من الصفر، وأنهِ الدورة بمشروع حقيقي وشهادة من Autodesk.",
    subtitle: "من أول رسم ثنائي الأبعاد إلى التجميع والرسومات الفنية. بالعربي، مع تقييم شخصي لمشروعك النهائي.",
    note: "لا تحتاج بطاقة لتبدأ الدروس المجانية.",
    video: "https://www.youtube.com/embed/QOqYmdmz32Q",
    videoPlaceholder: "فيديو تعريفي بالدورة"
  },

  stats: [
    { value: "41", label: "درساً مسجّلاً" },
    { value: "9 س 6 د", label: "من الفيديو" },
    { value: "130", label: "متعلماً مسجّلاً" },
    { value: "5 وحدات", label: "من الصفر إلى التجميع" }
  ],

  pricing: {
    eyebrow: "قيمة واضحة قبل أن تدفع",
    title: "ماذا تحصل عليه مقابل {price} دولاراً",
    features: [
      "<b>41 درساً مسجّلاً بالعربية</b>، مجموعها 9 ساعات و6 دقائق",
      "<b>ابدأ مجاناً:</b> أول {free} دروس متاحة قبل الدفع",
      "<b>تمارين ومشاريع تطبيقية</b> في كل وحدة",
      "<b>تقييم شخصي</b> لمشروعك النهائي من المدرّب",
      "<b>شهادة من Autodesk</b> عند الإتمام",
      "<b>منتدى خاص بالدورة</b> لطرح أسئلتك",
      "جلسة أسئلة مباشرة شهرية مع المدرّب على Zoom",
      "<b>تعلّم بوتيرتك</b>، والوصول دائم"
    ],
    cardTitle: "الدورة كاملة",
    priceUnit: "دولاراً، مرة واحدة",
    priceNote: "لا اشتراك شهري. جرّب الدروس المجانية أولاً، ثم أكمل متى كنت جاهزاً.",
    paymentsTitle: "طرق الدفع",
    payments: [
      { label: "بطاقة", online: true },
      { label: "PayPal", online: true },
      { label: "Whish Money" },
      { label: "OMT" },
      { label: "تحويل بنكي" },
      { label: "Western Union" }
    ],
    paymentsNote: "اضغط على طريقة الدفع التي تناسبك. من لبنان أو من خارجه."
  },

  curriculum: {
    eyebrow: "المنهج",
    title: "من التثبيت إلى التجميع والرسم الفني، في 5 وحدات",
    intro: "الشرح بالعربية، وأسماء الأدوات كما تظهر في البرنامج بالإنجليزية. اضغط على أي وحدة لترى دروسها.",
    freeLabel: "فيها دروس مجانية",
    emptyLessons: "قائمة الدروس قريباً",
    modules: [
      {
        num: 0, title: "مقدمة", meta: "7 دروس · 42 دقيقة", free: true,
        lessons: [
          { title: "How to use the platform", free: true },
          { title: "Creating a Google drive shared folder", free: true },
          { title: "Introduction to CAD", free: true },
          { title: "Can't Stop Talking About Fusion 360", free: true },
          { title: "Fusion 360 Overview 1", free: true },
          { title: "Fusion 360 Overview 2", free: true },
          { title: "Fusion 360 Overview 3", free: true }
        ]
      },
      {
        num: 1, title: "الإعداد والواجهة", meta: "درسان · 34 دقيقة", free: true,
        lessons: [
          { title: "Setup & Installation", free: true },
          { title: "Interface & Navigation" }
        ]
      },
      {
        num: 2, title: "النمذجة ثلاثية الأبعاد الأساسية", meta: "10 دروس · ساعتان و59 دقيقة",
        lessons: [
          { title: "Introduction to Constraints & 3D Design" },
          { title: "Play Brick, Rectangular Pattern" },
          { title: "Export and Submit Assignments" },
          { title: "Chamfer Feature" },
          { title: "Just Practice with Fusion 360!" },
          { title: "Circular Pattern" },
          { title: "Fillet" },
          { title: "Holes" },
          { title: "Tangent Constraints" },
          { title: "Practice" }
        ]
      },
      {
        num: 3, title: "التصميم بالميزات", meta: "15 درساً · 3 ساعات و37 دقيقة",
        lessons: [
          { title: "Revolve Feature" },
          { title: "Practice 1 (Revolve)" },
          { title: "Practice 2 (Revolve)" },
          { title: "Slots (Sketch)" },
          { title: "Mirror Feature" },
          { title: "Sweep Feature" },
          { title: "Shell Feature" },
          { title: "Practice (Sweep & Mirror)" },
          { title: "3D Sketch" },
          { title: "Symmetric Extrude" },
          { title: "Construction Planes" },
          { title: "Practice Exercises" },
          { title: "Loft using Profiles" },
          { title: "Loft using Rails / Threads" },
          { title: "Coil" }
        ]
      },
      {
        num: 4, title: "التجميع والرسومات الفنية", meta: "7 دروس · ساعة و14 دقيقة",
        lessons: [
          { title: "Body vs Component" },
          { title: "Align and Rigid Assembly" },
          { title: "Revolute & Slider Assembly" },
          { title: "As-Built Joint" },
          { title: "Organize Assembly Components" },
          { title: "Motion Link" },
          { title: "Technical Drawing" }
        ]
      }
    ]
  },

  outcomes: {
    eyebrow: "النتيجة",
    title: "بعد الدورة ستستطيع",
    items: [
      { title: "رسم مخططات دقيقة", text: "التنقل في الواجهة، الأبعاد والقيود (Constraints) التي تجعل الرسم ثابتاً." },
      { title: "نمذجة بارامترية", text: "تصاميم تعدّل أبعادها فيتغيّر المجسّم كله معها." },
      { title: "أدوات التصميم الأساسية", text: "Chamfer وFillet وSlots وHoles والأنماط الدائرية والمستطيلة." },
      { title: "نمذجة متقدمة", text: "Revolve وSweep وLoft وCoil وMirror، ورسم ثلاثي الأبعاد." },
      { title: "تجميع وتحريك القطع", text: "وصلات Rigid وRevolute وSlider وMotion Link لتختبر حركة التصميم." },
      { title: "رسومات فنية", text: "لوحات تقنية واضحة تُسلَّم للتصنيع أو تُضاف إلى ملف أعمالك." }
    ]
  },

  audience: {
    eyebrow: "لمن هذه الدورة",
    title: "لا تحتاج خلفية هندسية لتبدأ",
    items: [
      { title: "طلاب الهندسة وتصميم المنتجات", text: "لمشاريعك ومشروع التخرج، وشهادة تضيفها إلى سيرتك." },
      { title: "طلاب المعاهد التقنية", text: "مهارة تطبيقية تقرّبك من ورش التصنيع والطباعة." },
      { title: "الهواة وصنّاع الطباعة ثلاثية الأبعاد", text: "حوّل فكرتك إلى ملف جاهز للطباعة." },
      { title: "طلاب المدارس وأهاليهم", text: "تصميم حقيقي من البيت، بالعربية، ونتيجة يراها الأهل." }
    ]
  },

  certificate: {
    eyebrow: "الشهادة",
    title: "ثلاث خطوات إلى شهادة من Autodesk",
    steps: [
      { title: "أكمل التمارين والمشاريع", text: "في كل وحدة تطبيق عملي بعد الشرح." },
      { title: "سلّم عملك عبر Google Drive", text: "درس في الدورة يشرح لك الطريقة خطوة بخطوة." },
      { title: "اجتز تقييم المشروع النهائي", text: "مع ملاحظات شخصية من المدرّب على تصميمك." }
    ],
    image: "certificate.png",
    imagePlaceholder: "صورة نموذج الشهادة"
  },

  howTo: {
    title: "كيف تبدأ",
    steps: [
            { title: "جرّب مجاناً", text: "اكتب اسمك وبريدك الإلكتروني، ويصلك رابط الدروس المجانية فوراً." },
      { title: "اشترِ حين تكون جاهزاً", text: "ادفع بالبطاقة أو PayPal من الموقع، أو عبر WhatsApp بالطريقة التي تناسبك." },
      { title: "تعلّم وأنجز مشروعك", text: "يُفعَّل وصولك خلال 24 ساعة، وتكمل بوتيرتك حتى الشهادة." }
    ]
  },

  instructor: {
    eyebrow: "المدرّب",
    name: "م. حمزة عمّار",
    role: "مهندس حاسوب وروبوتات | رائد أعمال",
    photo: "hamza.png",
    bullets: [
      "أول مدرّب معتمد من Autodesk لبرنامج Fusion 360 في لبنان",
      "أكثر من 50 ورشة عمل في الإلكترونيات والبرمجة والتصميم الميكانيكي",
      "ميدالية ذهبية في بطولة عالمية للروبوتات في سنغافورة",
      "خبرة في برمجيات الآلات الصناعية"
    ]
  },

  testimonials: {
    title: "انضم إلى <span class='scribble'>130 متعلماً</span>",
subtitle: "من تقييمات المتعلمين على الدورة (مترجمة من الإنجليزية)",
      testimonials: {
    title: "انضم إلى <span class='scribble'>130 متعلماً</span>",
    subtitle: "من تقييمات المتعلمين على الدورة (مترجمة من الإنجليزية)",
    items: [
      {
        quote: "أنهيت مؤخراً دورة Fusion 360 من RoboGeex Academy، وكانت من أكثر تجارب التعلّم فائدةً لي. الدورة منظّمة جيداً، تبدأ من الأساسيات وتتدرّج نحو تقنيات أكثر تقدّماً، ما يجعلها سهلة المتابعة حتى لمبتدئ تماماً. أكثر ما أعجبني التمارين التطبيقية: كانت مبتكرة وفيها تحدٍّ، وساعدتني على تطبيق ما تعلّمته فوراً. شرح المدرّب م. حمزة عمّار كل شيء بوضوح، وشارك نصائح حسّنت طريقة عملي فعلاً. في النهاية صرت واثقاً من استخدام Fusion 360، وأنجزت عدّة مشاريع صغيرة أفتخر بها. شكراً كبيراً لـ م. حمزة ولـ RoboGeex Academy، هذه الدورة لم تعلّمني أداة فقط، بل جعلت التعلّم ممتعاً حقاً. أنصح بها بشدّة.",
        author: "Hamad Hajj Sleiman · ★★★★★",
        image: ""
      },
      {
        quote: "أنهيت مؤخراً دورة Fusion 360 ووجدتها عملية جداً ومنظّمة بشكل ممتاز. الدروس واضحة، تبدأ من أساسيات الرسم ثم تتدرّج نحو ميزات أكثر تقدّماً مثل النمذجة البارامترية والتجميع ومسارات التصنيع (CAM). المشاريع التطبيقية رسّخت ما تعلّمته ومنحتني الثقة لأبدأ بتصميم قطعي الخاصة. شرح المدرّب المفاهيم بطريقة بسيطة وسهلة المتابعة، وكانت الوتيرة مناسبة تماماً للمبتدئين.",
        author: "Hasan Jaber · ★★★★★",
        image: ""
      },
      {
        quote: "كل الدورات واضحة ومنظّمة بشكل ممتاز.",
        author: "Joseph Saleh · ★★★★★",
        image: ""
      }
    ]
  },

  signup: {
    eyebrow: "جرّب قبل أن تدفع",
    title: "ابدأ أول {free} دروس مجاناً",
    text: "يصلك رابط الدروس على بريدك الإلكتروني فوراً، مع نصيحة لأسبوعك الأول. لا بطاقة، ولا التزام.",
  scriptUrl:"https://script.google.com/macros/s/AKfycbw8sjGpQsmHxbgmjfI7Sy_wkJqgHsYV4dzq5zlyk-TKXCFSl2eG6VGUiVJdhZXSPX43/exec",
    namePlaceholder: "الاسم الكامل",
    emailPlaceholder: "البريد الإلكتروني، مثل name@gmail.com",
    phonePlaceholder: "رقم WhatsApp (اختياري)، مثل 96171123456",
    rolePlaceholder: "أنا...",
    roles: ["طالب جامعي", "طالب معهد تقني", "هاوٍ أو مبتدئ", "وليّ أمر لطالب مدرسة", "أمثّل مدرسة أو جامعة"],
    nameError: "اكتب اسمك بالأحرف فقط، بدون أرقام أو رموز.",
    emailError: "اكتب بريداً إلكترونياً صحيحاً، مثل name@gmail.com",
    phoneError: "اكتب الرقم بالأرقام فقط مع رمز الدولة، مثل 96171123456",
    button: "أرسل لي الدروس المجانية",
    sending: "جارٍ الإرسال...",
    success: "تم! أرسلنا رابط الدروس إلى بريدك الإلكتروني. إذا لم تجده خلال دقائق، تحقّق من مجلد الرسائل غير المرغوب فيها (Spam).",
    error: "حدث خطأ، حاول مرة أخرى أو تواصل معنا على WhatsApp.",
    privacy: "نستخدم بياناتك فقط لإرسال الدروس ومتابعتك بخصوص الدورة.",
    waMessage: "مرحباً، أريد الدروس المجانية لدورة Fusion 360 | الاسم: {name} | الرقم: {phone} | أنا: {role}"
  },

  faq: {
    title: "أسئلة شائعة",
    items: [
      { q: "هل الدورة مناسبة للمبتدئين؟", a: "نعم. تبدأ من تثبيت البرنامج والتعرّف على الواجهة، ولا تحتاج خلفية هندسية." },
      { q: "ما لغة الدورة؟", a: "الشرح بالعربية، وأسماء الأدوات كما تظهر في البرنامج بالإنجليزية." },
      { q: "كم من الوقت أحتاج؟", a: "مجموع الفيديو 9 ساعات و6 دقائق، وتتعلم بوتيرتك." },
      { q: "هل أحتاج حاسوباً قوياً؟", a: "اكتب الجواب هنا." },
      { q: "كيف أحصل على الشهادة؟", a: "أكمل التمارين، سلّم مشروعك عبر Google Drive، واجتز تقييم المشروع النهائي." },
      { q: "كيف أدفع من خارج لبنان؟", a: "بالبطاقة أو PayPal أو Western Union." },
      { q: "متى يُفعَّل وصولي بعد الدفع؟", a: "اكتب المدة هنا." },
      { q: "هل يمكن استرداد المبلغ؟", a: "اكتب سياسة الاسترداد هنا." }
    ],
    moreText: "سؤالك غير موجود؟",
    moreLink: "اسألنا على WhatsApp",
    moreMessage: "مرحباً، عندي سؤال عن دورة Fusion 360"
  },

  finalCta: {
    title: "ابدأ اليوم بقطعتك الأولى",
    text: "جرّب مجاناً، واشترِ بـ {price} دولاراً حين تقرر.",
    groupLink: "مدرسة أو جامعة؟ اطلب عرضاً لمجموعة طلاب",
    groupMessage: "مرحباً، أمثّل مؤسسة تعليمية وأريد عرضاً لمجموعة طلاب"
  }
};
