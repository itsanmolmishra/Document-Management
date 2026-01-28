# 📐 DMAS Spacing System Guide

## ✅ Implementation Complete

Your Dubai Finance Department DMAS now follows a **consistent, precise spacing system** across all components.

---

## 🎯 Applied Standards

### 1. **Page Wrapper & Container** ✅

**Applied to:** `/src/app/components/layout/MainLayout.tsx`

```tsx
// Standard page wrapper
<div className="min-h-screen bg-white pb-[64px] pt-[32px] px-[32px]">
  {/* Page content container */}
  <div className="max-w-7xl mx-auto space-y-16">
    {children}
  </div>
</div>
```

**Spacing:**
- Top padding: `pt-[32px]` (32px)
- Bottom padding: `pb-[64px]` (64px)
- Horizontal padding: `px-[32px]` (32px)
- Max width: `max-w-7xl` (1280px)
- Section spacing: `space-y-16` (64px between major sections)

---

### 2. **Page Header Pattern** ✅

**Applied to:** Dashboard, Documents, Workflows, Archive, Reports

```tsx
// Standard page header
<div className="space-y-[16px] mb-[32px]">
  <h2 className="font-semibold text-[30px] leading-[36px] tracking-[-0.225px]">
    Page Title
  </h2>
  <p className="text-[16px] leading-[28px] text-slate-500">
    Page description
  </p>
</div>
```

**Spacing:**
- Title to description: `16px` vertical gap
- Header to content: `mb-[32px]` (32px bottom margin)
- After header: Separator (if needed)

---

### 3. **Card Component** ✅

**Updated:** `/src/app/components/ui/card.tsx`

```tsx
// Card container
rounded-[6px]  // 6px border radius

// Card padding
<CardContent className="p-6">  // 24px all sides

// Card header spacing
<CardHeader className="space-y-2 p-6">  // 8px gap, 24px padding

// Card title typography
font-semibold text-[18px] leading-[28px]

// Card description typography
text-[14px] leading-[20px]
```

**Standards:**
- Border radius: `rounded-[6px]`
- Content padding: `p-6` (24px)
- Header spacing: `space-y-2` (8px)
- Title font: 18px / 28px line-height
- Description font: 14px / 20px line-height

---

### 4. **Grid Spacing** ✅

**Stats Grid (4-column):**
```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
```
- Gap: `gap-6` (24px)

**Card Grid (3-column):**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```
- Gap: `gap-6` (24px)

**2-Column Layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```
- Gap: `gap-6` (24px)

---

### 5. **Typography Spacing** ✅

**H2 (Page Title):**
```tsx
font-semibold text-[30px] leading-[36px] tracking-[-0.225px]
```

**H3 (Section Title):**
```tsx
font-semibold text-[24px] leading-[32px] tracking-[-0.144px]
```

**Card Title:**
```tsx
font-semibold text-[18px] leading-[28px]
```

**Body Text:**
```tsx
text-[16px] leading-[28px]  // 12px line spacing
```

**Small Text:**
```tsx
text-[14px] leading-[20px]  // 6px line spacing
```

**Button Text:**
```tsx
text-[14px] leading-[24px]  // 10px line spacing
```

---

### 6. **Button Spacing** ✅

**Default Button:**
```tsx
px-[16px] py-[8px]  // 16px horizontal, 8px vertical
rounded-[6px]  // 6px border radius
```

**Icon in Button:**
```tsx
<Icon className="w-4 h-4 mr-2" />  // 16px icon, 8px gap
```

**Button Sizes:**
- Small: `h-9 px-3 text-xs`
- Default: `h-10 px-4 py-2`
- Large: `h-11 px-8`
- Icon only: `h-10 w-10`

---

### 7. **Input Fields** ✅

**Standard Input:**
```tsx
px-[12px] py-[8px]  // 12px horizontal, 8px vertical
rounded-[6px]  // 6px border radius
```

**Label to Input:**
```tsx
<div className="space-y-2">
  <Label>Label</Label>
  <Input />
</div>
```
- Gap: `space-y-2` (8px)

**Form Field Spacing:**
```tsx
<form className="space-y-4">
  <div className="space-y-2">...</div>
  <div className="space-y-2">...</div>
</form>
```
- Between fields: `space-y-4` (16px)

---

### 8. **Section Spacing** ✅

**Major Sections:**
```tsx
space-y-16  // 64px vertical gap
```

**Subsections:**
```tsx
space-y-8   // 32px vertical gap
```

**Between Cards:**
```tsx
gap-6       // 24px gap
```

**Between Items:**
```tsx
gap-4       // 16px gap
```

---

### 9. **Icon Spacing** ✅

**Icon Sizes:**
- Small (buttons, inline): `w-4 h-4` (16px)
- Medium (CTA buttons): `w-5 h-5` (20px)
- Card icons: `w-6 h-6` (24px)
- Stat card icons: `w-10 h-10` (40px)
- Feature icons: `w-12 h-12` (48px)

**Icon Gaps:**
```tsx
// Icon before text
<Icon className="w-4 h-4 mr-2" />  // 8px gap

// Icon after text
<Icon className="w-4 h-4 ml-2" />  // 8px gap
```

**Icon Container:**
```tsx
<div className="w-12 h-12 bg-[#f1f5f9] rounded-[6px] flex items-center justify-center">
  <Icon className="w-6 h-6" />
</div>
```

---

### 10. **Badge Spacing** ✅

**Badge:**
```tsx
rounded-[6px]  // 6px border radius
px-2.5 py-0.5  // 10px horizontal, 2px vertical
```

---

## 📊 Applied Components

### ✅ MainLayout
- Standard page wrapper: `min-h-screen bg-white pb-[64px] pt-[32px] px-[32px]`
- Content container: `max-w-7xl mx-auto space-y-16`

### ✅ Dashboard
- Page header: `space-y-[16px] mb-[32px]`
- Page title: `text-[30px] leading-[36px] tracking-[-0.225px]`
- Stats grid: `grid-cols-4 gap-6`
- Card grid: `gap-6`
- Section spacing: `space-y-6`

### ✅ Card Component
- Border radius: `rounded-[6px]`
- Content padding: `p-6`
- Header spacing: `space-y-2`
- Title: `text-[18px] leading-[28px]`
- Description: `text-[14px] leading-[20px]`

### ✅ Button Component
- Default padding: `px-[16px] py-[8px]`
- Border radius: `rounded-[6px]`
- Icon gap: `mr-2` (8px)

### ✅ Input Component  
- Default padding: `px-[12px] py-[8px]`
- Border radius: `rounded-[6px]`
- Label spacing: `space-y-2`

---

## 🎨 Complete Spacing Reference

### Padding Values
```
[8px]   - py-[8px], px-[8px] (inputs, buttons)
[12px]  - px-[12px] (inputs)
[16px]  - px-[16px] (buttons)
[32px]  - pt-[32px], px-[32px] (page wrapper)
[64px]  - pb-[64px] (page wrapper bottom)
```

### Gap Values
```
gap-2   - 8px (label to input)
gap-3   - 12px
gap-4   - 16px (form fields, menu items)
gap-6   - 24px (card grids, stats grids)
gap-8   - 32px (subsections)
```

### Space-Y Values
```
space-y-1   - 4px
space-y-2   - 8px (card header, label to input)
space-y-4   - 16px (form fields)
space-y-6   - 24px (subsections in dashboard)
space-y-8   - 32px (subsections)
space-y-16  - 64px (major sections)
```

### Margin Values
```
mb-[32px]  - After page headers
mt-2       - 8px (stat card trend label)
mt-4       - 16px
```

### Border Radius
```
rounded-[6px]     - Cards, buttons, badges, inputs
rounded-[40px]    - Progress bars (full rounded)
rounded-full      - Avatars, pills
rounded-lg        - Larger elements
rounded-xl        - Dialogs, modals
```

---

## 📝 Usage Examples

### Page Structure
```tsx
// Complete page pattern
<div className="space-y-16">
  {/* Page header */}
  <div className="space-y-[16px] mb-[32px]">
    <h2 className="font-semibold text-[30px] leading-[36px] tracking-[-0.225px]">
      Dashboard
    </h2>
    <p className="text-[16px] leading-[28px] text-slate-500">
      Welcome to your dashboard
    </p>
  </div>
  
  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <Card>
      <CardContent className="p-6">
        Stat content
      </CardContent>
    </Card>
  </div>
  
  {/* Card Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader className="space-y-2 p-6">
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        Content
      </CardContent>
    </Card>
  </div>
</div>
```

### Form Pattern
```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <Label>Email</Label>
    <Input 
      className="px-[12px] py-[8px] rounded-[6px]"
      placeholder="email@example.com" 
    />
  </div>
  
  <div className="space-y-2">
    <Label>Password</Label>
    <Input 
      type="password"
      className="px-[12px] py-[8px] rounded-[6px]"
    />
  </div>
  
  <Button className="px-[16px] py-[8px] rounded-[6px]">
    <Icon className="w-4 h-4 mr-2" />
    Submit
  </Button>
</form>
```

---

## ✨ Benefits of This System

### ✅ **Consistency**
- All components use the same spacing values
- Predictable layouts across all pages
- Professional government-grade appearance

### ✅ **Precision**
- Exact pixel values match design specifications
- No arbitrary spacing decisions
- Maintains design fidelity

### ✅ **Scalability**
- Easy to maintain across large codebase
- New components follow existing patterns
- Reduces decision fatigue

### ✅ **Readability**
- Clear visual hierarchy
- Proper breathing room between elements
- Professional typography spacing

---

## 🎯 Quick Reference Card

```tsx
// Page Wrapper
min-h-screen bg-white pb-[64px] pt-[32px] px-[32px]

// Container
max-w-7xl mx-auto space-y-16

// Header
space-y-[16px] mb-[32px]

// Title
font-semibold text-[30px] leading-[36px] tracking-[-0.225px]

// Stats Grid
grid grid-cols-4 gap-6

// Card Grid
grid grid-cols-3 gap-6

// Card
rounded-[6px] p-6

// Button
px-[16px] py-[8px] rounded-[6px]

// Input
px-[12px] py-[8px] rounded-[6px]

// Form Field
space-y-2

// Form
space-y-4
```

---

## 🚀 Result

Your DMAS now has:
- ✅ Consistent spacing throughout
- ✅ Professional visual hierarchy
- ✅ Government-grade polish
- ✅ Pixel-perfect precision
- ✅ Scalable spacing system

**Every element is perfectly spaced according to the design system!** 🎨
