export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Auth
    "auth.title": "Secure Document Management System",
    "auth.subtitle": "Department of Finance – Government of Dubai",
    "auth.username": "Username / Employee ID",
    "auth.password": "Password",
    "auth.signin": "Sign In",
    "auth.uaepass": "Sign in with UAE PASS",
    "auth.sso": "Sign in using Government SSO",
    "auth.footer": "Authorized access only. All activities are logged and monitored.",
    
    // Global
    "app.org": "Department of Finance",
    "app.env": "PRODUCTION",
    "search.placeholder": "Search by document name, content, metadata, or reference number...",
    
    // Sidebar
    "nav.dashboard": "Dashboard",
    "nav.documents": "Documents",
    "nav.search": "Search",
    "nav.workflows": "Workflows",
    "nav.archive": "Archive",
    "nav.compliance": "Compliance",
    "nav.reports": "Reports",
    "nav.integrations": "Integrations",
    "nav.settings": "Admin / Settings",

    // Dashboard
    "dash.welcome": "Welcome",
    "dash.myDocs": "My Documents",
    "dash.pending": "Pending Actions",
    "dash.recent": "Recently Updated",
    "dash.compliance": "Compliance Status",
    "dash.upload": "Upload New Document",
    "dash.searchRec": "Search Records",
    "dash.viewSub": "View My Submissions",
    "dash.pendingApprovals": "Pending Approvals",
    "dash.docsMonth": "Documents This Month",
    "dash.policyViol": "Policy Violations",
    "dash.teamLog": "Team Activity Log",
    "dash.docsDueArchival": "Documents Due for Archival",
    "dash.retentionExpiry": "Retention Expiry (30 days)",
    "dash.archivedMonth": "Archived This Month",
    "dash.auditEvents": "Audit Events Today",
    "dash.highRisk": "High-Risk Access Attempts",
    "dash.activeUsers": "Active Users",
    "dash.sysHealth": "System Health",
    "dash.storage": "Storage Usage",
    
    // Document Repository
    "repo.title": "Enterprise Document Repository",
    "repo.noDocs": "No documents found matching the selected criteria.",
    "repo.col.name": "Name",
    "repo.col.type": "Type",
    "repo.col.class": "Classification",
    "repo.col.owner": "Owner",
    "repo.col.lastMod": "Last Modified",
    "repo.col.status": "Status",

    // Upload
    "upload.title": "Upload New Document",
    "upload.hint": "Supported formats: PDF, Word, Excel, PowerPoint, Images",
    "upload.docTitle": "Document Title",
    "upload.docType": "Document Type",
    "upload.dept": "Department",
    "upload.desc": "Description",
    "upload.class": "Classification Level",
    "upload.retention": "Retention Policy",
    "upload.submit": "Submit for Approval",
    "upload.warning": "Once submitted, this document cannot be edited until approval is completed.",

    // Approvals
    "review.title": "Review Document",
    "review.approve": "Approve",
    "review.reject": "Reject",
    "review.requestChanges": "Request Changes",
    "review.commentPlaceholder": "Add review comments (mandatory for rejection)",

    // Archive
    "archive.title": "Retention & Archival Management",
    "archive.due": "Due for Action",
    "archive.confirm": "Archive Confirmation",
    "archive.confirmMsg": "This document will be moved to long-term secure storage and become read-only.",
    "archive.dispose": "Disposal Confirmation",
    "archive.disposeMsg": "This action is irreversible and subject to audit review.",
    
    // Roles
    "role.staff": "Staff",
    "role.manager": "Manager",
    "role.records": "Records Officer",
    "role.compliance": "Compliance Officer",
    "role.admin": "Admin"
  },
  ar: {
    // Auth
    "auth.title": "نظام إدارة الوثائق الآمن",
    "auth.subtitle": "دائرة المالية – حكومة دبي",
    "auth.username": "اسم المستخدم / الرقم الوظيفي",
    "auth.password": "كلمة المرور",
    "auth.signin": "تسجيل الدخول",
    "auth.uaepass": "الدخول عبر الهوية الرقمية",
    "auth.sso": "الدخول الموحد الحكومي",
    "auth.footer": "الدخول مصرح به فقط. جميع الأنشطة مراقبة ومسجلة.",

    // Global
    "app.org": "دائرة المالية",
    "app.env": "الإنتاج",
    "search.placeholder": "البحث بالاسم، المحتوى، البيانات الوصفية، أو الرقم المرجعي...",

    // Sidebar
    "nav.dashboard": "لوحة القيادة",
    "nav.documents": "الوثائق",
    "nav.search": "البحث",
    "nav.workflows": "سير العمل",
    "nav.archive": "الأرشيف",
    "nav.compliance": "الامتثال",
    "nav.reports": "التقارير",
    "nav.integrations": "التكامل",
    "nav.settings": "الإعدادات",

    // Dashboard
    "dash.welcome": "مرحباً",
    "dash.myDocs": "وثائقي",
    "dash.pending": "إجراءات معلقة",
    "dash.recent": "تم تحديثه مؤخراً",
    "dash.compliance": "حالة الامتثال",
    "dash.upload": "رفع وثيقة جديدة",
    "dash.searchRec": "بحث في السجلات",
    "dash.viewSub": "عرض تقديماتي",
    "dash.pendingApprovals": "موافقات معلقة",
    "dash.docsMonth": "وثائق هذا الشهر",
    "dash.policyViol": "مخالفات السياسة",
    "dash.teamLog": "سجل نشاط الفريق",
    "dash.docsDueArchival": "وثائق مستحقة للأرشفة",
    "dash.retentionExpiry": "انتهاء الحفظ (30 يوماً)",
    "dash.archivedMonth": "مؤرشفة هذا الشهر",
    "dash.auditEvents": "أحداث التدقيق اليوم",
    "dash.highRisk": "محاولات دخول عالية المخاطر",
    "dash.activeUsers": "المستخدمون النشطون",
    "dash.sysHealth": "حالة النظام",
    "dash.storage": "استخدام التخزين",

    // Document Repository
    "repo.title": "مستودع الوثائق المؤسسي",
    "repo.noDocs": "لا توجد وثائق مطابقة للمعايير المحددة.",
    "repo.col.name": "الاسم",
    "repo.col.type": "النوع",
    "repo.col.class": "التصنيف",
    "repo.col.owner": "المالك",
    "repo.col.lastMod": "آخر تعديل",
    "repo.col.status": "الحالة",

    // Upload
    "upload.title": "رفع وثيقة جديدة",
    "upload.hint": "الصيغ المدعومة: PDF, Word, Excel, PowerPoint, Images",
    "upload.docTitle": "عنوان الوثيقة",
    "upload.docType": "نوع الوثيقة",
    "upload.dept": "القسم",
    "upload.desc": "الوصف",
    "upload.class": "مستوى التصنيف",
    "upload.retention": "سياسة الحفظ",
    "upload.submit": "إرسال للموافقة",
    "upload.warning": "بمجرد الإرسال، لا يمكن تعديل هذه الوثيقة حتى اكتمال الموافقة.",

    // Approvals
    "review.title": "مراجعة الوثيقة",
    "review.approve": "موافقة",
    "review.reject": "رفض",
    "review.requestChanges": "طلب تعديلات",
    "review.commentPlaceholder": "أضف ملاحظات المراجعة (إلزامي للرفض)",

    // Archive
    "archive.title": "إدارة الحفظ والأرشفة",
    "archive.due": "مستحق للإجراء",
    "archive.confirm": "تأكيد الأرشفة",
    "archive.confirmMsg": "سيتم نقل هذه الوثيقة إلى التخزين الآمن طويل الأمد وتصبح للقراءة فقط.",
    "archive.dispose": "تأكيد الإتلاف",
    "archive.disposeMsg": "هذا الإجراء لا رجعة فيه ويخضع لمراجعة التدقيق.",

    // Roles
    "role.staff": "موظف",
    "role.manager": "مدير",
    "role.records": "مسؤول السجلات",
    "role.compliance": "مسؤول الامتثال",
    "role.admin": "مدير النظام"
  }
};
