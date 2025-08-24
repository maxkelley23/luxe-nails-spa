# 🚀 QUICK CUSTOMIZATION GUIDE FOR SALES TEAM

**Time Required: 15-20 minutes per client**

## 📋 Pre-Demo Checklist
- [ ] Get client's business name
- [ ] Get client's phone number
- [ ] Get client's address
- [ ] Get client's business hours
- [ ] Get 3-5 actual service prices
- [ ] Get their Instagram handle (if they have one)

---

## 1️⃣ CHANGE BUSINESS NAME (2 minutes)

### Step 1: Update Navigation
- **File:** `components/navigation.tsx`
- **Line:** ~15
- **Change:** "Luxe Nails & Spa" → "[Client Business Name]"

### Step 2: Update Footer
- **File:** `components/footer.tsx`
- **Line:** 60-61
- **Change:** "Luxe Nails & Spa" → "[Client Business Name]"

### Step 3: Update Page Title
- **File:** `app/layout.tsx`
- **Line:** 19
- **Change:** "Luxe Nails & Spa" → "[Client Business Name]"

---

## 2️⃣ CHANGE CONTACT INFO (3 minutes)

### Update Footer Contact
- **File:** `components/footer.tsx`
- **Lines to change:**
  - Line 70: Address → Client's actual address
  - Line 74: Phone → Client's phone (format: (XXX) XXX-XXXX)
  - Line 78: Email → hello@[clientdomain].com

### Update Booking Section Phone
- **File:** `components/booking-section-improved.tsx`
- **Line:** 283
- **Change:** "(555) 123-NAILS" → Client's phone

### Update WhatsApp Number
- **File:** `components/whatsapp-button.tsx`
- **Line:** 6
- **Change:** "15551234567" → Client's WhatsApp number (no spaces/dashes)

---

## 3️⃣ CHANGE BUSINESS HOURS (2 minutes)

### Update Footer Hours
- **File:** `components/footer.tsx`
- **Lines:** 24-28
- **Format:**
```javascript
{ day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
{ day: "Saturday", hours: "9:00 AM - 6:00 PM" },
{ day: "Sunday", hours: "10:00 AM - 5:00 PM" },
```

### Update Booking Section Hours
- **File:** `components/booking-section-improved.tsx`
- **Line:** 290
- **Change:** To match client's actual hours

### Update Open Now Indicator
- **File:** `components/open-now-indicator.tsx`
- **Lines:** 17-24
- **Update schedule object with actual hours (use 24-hour format in minutes)

---

## 4️⃣ CHANGE PRICES (5 minutes)

### Update Service Prices
- **File:** `components/pricing-section.tsx`
- **Lines:** 10, 27, 46 (prices for each tier)
- **Change prices to match client's actual pricing

### Update Booking Form Services
- **File:** `components/booking-section-improved.tsx`
- **Lines:** 26-31
- **Update service names and prices

Example:
```javascript
{ id: "basic-manicure", name: "Basic Manicure", price: "$30", duration: "30 min" },
{ id: "gel-nails", name: "Gel Nails", price: "$50", duration: "60 min" },
```

---

## 5️⃣ CHANGE COLORS (3 minutes) - OPTIONAL

### Main Brand Colors
- **File:** `app/globals.css`
- **Lines:** Look for CSS variables
- **Common changes:**
  - `--hot-pink:` Change to client's primary color
  - `--purple:` Change to client's secondary color
  - `--gold:` Change to accent color

### Quick Color Presets:
```css
/* Elegant Black & Gold */
--hot-pink: 0 0 0;      /* black */
--purple: 139 117 0;    /* gold */

/* Ocean Blue */
--hot-pink: 59 130 246; /* blue */
--purple: 6 182 212;    /* cyan */

/* Natural Green */
--hot-pink: 34 197 94;  /* green */
--purple: 134 239 172;  /* light green */
```

---

## 6️⃣ QUICK IMAGE SWAP (5 minutes) - OPTIONAL

### Hero Background
- **File:** `components/hero-section.tsx`
- **Line:** 9
- **Replace:** `/luxury-nail-salon-interior-with-pink-and-purple-li.png`
- **With:** New image in `/public/` folder

### Gallery Images
- **File:** `components/gallery-section.tsx`
- **Lines:** 21-83
- **Update image paths if you have client's actual work photos

---

## 🎯 DEMO TALKING POINTS

### When showing the site, emphasize:

1. **Mobile-First Design**
   - "Pull out your phone and see how perfect this looks"
   - "70% of your clients will book on mobile"

2. **Online Booking**
   - "Clients can book 24/7, even at 2 AM"
   - "You'll never miss a booking again"

3. **WhatsApp Integration**
   - "Your younger clients prefer WhatsApp"
   - "Instant connection with one tap"

4. **Reviews Section**
   - "Build trust before they even visit"
   - "Social proof drives bookings"

5. **Instagram Gallery**
   - "Showcase your best work"
   - "Clients love browsing before booking"

6. **Email Capture**
   - "Build your marketing list automatically"
   - "Send promotions to boost slow days"

---

## 💡 CUSTOMIZATION TIPS

### For High-End Salons:
- Emphasize the luxury design elements
- Point out the pricing tiers
- Mention the "VIP experience" online

### For Budget Salons:
- Focus on efficiency features
- Emphasize 24/7 booking
- Highlight the professional appearance

### For Trendy/Young Salons:
- Show the Instagram integration
- Emphasize WhatsApp feature
- Point out the modern animations

---

## 🚨 COMMON ISSUES & FIXES

### Issue: Development server not running
```bash
pnpm dev
```
Then open: http://localhost:3000

### Issue: Changes not showing
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Restart dev server if needed

### Issue: Images not loading
- Make sure images are in `/public/` folder
- Use format: `/image-name.png` (with leading slash)

---

## 📱 MOBILE TESTING

### Quick Mobile Check:
1. Open Chrome DevTools: F12
2. Click phone icon (Toggle device toolbar)
3. Select "iPhone 12 Pro" or "Pixel 5"
4. Refresh page

### What to show on mobile:
- Booking form works perfectly
- WhatsApp button is prominent
- Gallery swipes nicely
- Menu collapses properly

---

## 💰 CLOSING THE DEAL

### Price Justification:
"This would normally cost $5,000+ upfront, plus hosting. With our service, it's just $150/month with everything included - hosting, updates, support, and changes."

### Urgency Creators:
- "Your competitor down the street just got online last month"
- "You're losing bookings to salons with online scheduling"
- "Google favors businesses with modern websites"

### Common Objections:

**"I already have Facebook/Instagram"**
→ "Great! This website integrates with your social media and captures clients Facebook might miss."

**"$150/month seems expensive"**
→ "That's just 3-4 manicures per month. One new client covers it."

**"I'm not tech-savvy"**
→ "That's why we handle everything. You just answer the phone when it rings more!"

---

## 📞 SUPPORT

**For technical issues during demo:**
- Have dev server running before demo
- Keep this guide open in another tab
- Have backup screenshots ready

**Remember:** The goal is to show value, not perfection. If something breaks, emphasize that we handle all technical issues as part of the service!