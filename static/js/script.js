function updateNavbarState(){
    const nav = document.getElementById('nb');
    if(!nav) return;

    const isHomePage = window.location.pathname === '/';
    const shouldUseSolidNav = window.scrollY > 10 || window.innerWidth <= 768 || !isHomePage;

    nav.classList.toggle('bg', shouldUseSolidNav);
}

window.addEventListener('scroll', updateNavbarState);
window.addEventListener('resize', updateNavbarState);
window.addEventListener('DOMContentLoaded', updateNavbarState);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.decoding = 'async';
    });
});

function toggleMenu(){document.getElementById('mm').classList.toggle('open')}
function closeMM(){document.getElementById('mm').classList.remove('open')}
function toggleFaq(btn){
    const item = btn.parentElement;
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if(!open) item.classList.add('open');
}
function submitForm(){alert('Thank you! Your booking request has been received.\nOur team at SK AC Repair Services will call you shortly to confirm your appointment.')}

function submitToWhatsapp(customService) {
    const name = document.getElementById('cName') ? document.getElementById('cName').value : '';
    const phone = document.getElementById('cPhone') ? document.getElementById('cPhone').value : '';
    const area = document.getElementById('cArea') ? document.getElementById('cArea').value : '';
    const details = document.getElementById('cDetails') ? document.getElementById('cDetails').value : '';
    
    if(!name || !phone || !area) {
        alert('Please fill in Your Name, Phone Number, and Area.');
        return;
    }
    
    const message = `*SK AC Repair Services - Booking Request*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Phone:* ${phone}\n` +
                    `*Area:* ${area}\n` +
                    `*Service:* ${customService || details || 'General Service'}\n\n` +
                    `Please confirm my booking slot.`;
                    
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/917456884850?text=${encoded}`;
    
    window.location.href = waUrl;
}

// TESTIMONIAL SCROLL
function scrollTestimonials(dir) {
    const grid = document.getElementById('testiGrid');
    if(!grid) return;
    const cardWidth = grid.querySelector('.tc').offsetWidth + 24;
    grid.scrollBy({ left: cardWidth * dir, behavior: 'smooth' });
}

// MODAL LOGIC WITH TRANSPARENT PRICING FROM ACCAREINDIA & MARKET RATES
const serviceDetails = {
    'ac-split': {
        title: 'AC Installation & Repair (Split & Window)',
        price: 'Service from ₹499 | Installation from ₹599 (Window) / ₹1,349 (Split)',
        warranty: '90-Day Service Warranty on Repairs',
        desc: 'Complete doorstep installation, uninstallation, servicing, and repair for all Split and Window AC brands across Chandigarh & Mohali. No hidden charges — transparent quotes before work starts.',
        points: [
            'Window AC service ₹499 | Split AC service ₹599',
            'Deep Foam-Jet Wash with protective jacket: ₹699 (Window) / ₹799 (Split)',
            'Split AC Installation with bracket mounting & assembly: ₹1,349 – ₹1,499',
            'Window AC Installation: ₹599 – ₹699 | Uninstallation: ₹449',
            'Split AC Uninstallation: ₹799 – ₹899',
            'PCB circuit board, sensor & fan motor repair with OEM parts',
            'Water leakage fixing & drainage line deep flush'
        ]
    },
    'copper-pipe': {
        title: 'Copper Pipe Fitting (Underground & Open)',
        price: 'From ₹280 / Foot (Heavy-Gauge Pure Copper)',
        warranty: '100% Leak-Proof Nitrogen Tested',
        desc: 'Expert heavy-gauge copper refrigerant piping for new constructions, renovations, builder floors, and commercial spaces. High-density insulation prevents cooling loss.',
        points: [
            'Heavy-gauge insulated copper pipe with wire & drain: ₹280 – ₹350 / ft',
            'Concealed / underground wall-chasing & pipe laying: ₹350 – ₹420 / ft',
            '100% pure copper tubes with high-density nitrile rubber insulation',
            'Silver brazing for permanent, leak-proof joints',
            'Nitrogen pressure testing before wall plastering',
            'Complete drain line & multi-core copper wiring setup'
        ]
    },
    'washing-machine': {
        title: 'Washing Machine Repair & Service',
        price: 'Inspection from ₹299 | Minor Repairs from ₹499',
        warranty: '90-Day Service Warranty',
        desc: 'Fast, reliable doorstep repair for Front-Load, Top-Load, and Semi-Automatic washing machines of all major brands (LG, Samsung, IFB, Bosch, Whirlpool, Whirlpool, Godrej).',
        points: [
            'Doorstep inspection & diagnosis: ₹299 (adjusted if repaired)',
            'Drum bearing, spider & motor repair',
            'Water inlet valve & drain pump replacement',
            'Spin cycle noise & heavy vibration fixing',
            'Digital PCB panel & sensor troubleshooting',
            'Door gasket & water leakage sealing'
        ]
    },
    'refrigerator': {
        title: 'Fridge Repair & Gas Charging',
        price: 'Inspection from ₹299 | Full Gas Refill from ₹1,799',
        warranty: '90-Day Service Warranty',
        desc: 'Immediate diagnosis, gas charging, and cooling repair for Single-Door, Double-Door, and Side-by-Side refrigerators across Chandigarh & Mohali.',
        points: [
            'Doorstep inspection: ₹299 (adjusted in repair)',
            '100% genuine refrigerator gas charging (R134a / R600a): ₹1,799 – ₹2,199',
            'Compressor testing, relay & overload replacement',
            'Freezer cooling & ice-buildup defrost sensor fix',
            'Thermostat & inverter PCB repair',
            'Door rubber gasket airtightness replacement'
        ]
    },
    'geyser': {
        title: 'Geyser Installation & Repair',
        price: 'Installation from ₹499 | Element Repair from ₹399',
        warranty: '90-Day Service Warranty',
        desc: 'Safe wall mounting, plumbing connection, and electrical repair for storage and instant water heaters of all capacities with pressure valve testing.',
        points: [
            'Standard Geyser Installation: ₹499 | Uninstallation: ₹349',
            'Heating element / coil replacement: Starting ₹399',
            'Thermostat & auto-cut safety repair',
            'Pressure release valve (PRV) & pipe leakage fix',
            'Tank descaling & electrical safety grounding check'
        ]
    },
    'old-ac': {
        title: 'Old AC Buying (Sell Your Used AC)',
        price: 'Top Cash Offer (Up to ₹12,000+) + FREE Pickup',
        warranty: 'Instant Cash / UPI Payment on the Spot',
        desc: 'Get the highest instant cash or UPI value for your old, used, or scrap Split, Window, or Cassette air conditioners anywhere in Tricity. We take units in any working or dead condition.',
        points: [
            'Best market price for working & non-working ACs',
            'Window AC buyback up to ₹3,500 – ₹7,000+',
            'Split AC buyback up to ₹5,000 – ₹12,000+',
            'Free doorstep evaluation & transparent pricing',
            'Free safe uninstallation by our technicians',
            'Instant Cash / UPI payment before loading',
            'Single units or bulk office/hotel lots welcomed'
        ]
    },
    'gas-charging': {
        title: 'AC & Fridge Gas Charging',
        price: 'Gas Top-Up from ₹1,499 | Full Refill from ₹2,999 (1 Ton)',
        warranty: '90-Day Cooling & Leakage Warranty',
        desc: 'Restore brand-new ice-cold cooling with genuine refrigerant gas charging performed after proper leak testing and vacuuming.',
        points: [
            'Gas top-up & pressure balancing: From ₹1,499',
            'Complete gas refill 1 Ton (R32 / R410A / R22): ₹2,999 – ₹3,200',
            'Complete gas refill 1.5 Ton: ₹3,499 – ₹3,700',
            'Complete gas refill 2 Ton: ₹3,999 – ₹4,200',
            'Nitrogen & soap-bubble leak detection included',
            'Silver brazing to permanently seal copper pinholes',
            'High-capacity vacuum pump evacuation before gas charge'
        ]
    },
    'ac-cassette': {
        title: 'Cassette & Commercial AC Systems',
        price: 'Service from ₹999 | Installation on Site Quote',
        warranty: 'Commercial Maintenance & AMC Available',
        desc: 'Specialized installation, copper piping, and maintenance for ceiling-mounted cassette ACs and VRV/VRF commercial units in offices, showrooms, and restaurants.',
        points: [
            'Cassette AC deep foam-jet cleaning: From ₹999',
            'Ceiling cassette mounting & four-way airflow balance check',
            'Condensate drain pump cleaning & float switch test',
            'Commercial copper piping & outdoor load balancing',
            'Customized Annual Maintenance Contracts (AMC)'
        ]
    },
    'maintenance': {
        title: 'Foam-Jet Wash & Preventive Maintenance',
        price: 'Window AC Jet Wash: ₹699 | Split AC Jet Wash: ₹799',
        warranty: 'Immediate 2x Airflow & Odor Removal',
        desc: 'Thorough high-pressure jet cleaning using protective waterproof jackets. Removes deep mold, slime, and dust from indoor cooling coils and outdoor condenser fins.',
        points: [
            'Window AC Foam-Jet Wash: ₹699',
            'Split AC Indoor & Outdoor Foam-Jet Wash: ₹799',
            'Waterproof jacket setup prevents water splash inside your room',
            'Drain tray & outlet pipe chemical flush to eliminate water leaks',
            'Condenser coil fin straightening and deep jet wash',
            'Operating current (Ampere) & gas pressure verification'
        ]
    }
};

function showModal(id) {
    const data = serviceDetails[id];
    if(!data) return;
    
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDesc').innerText = data.desc;
    
    // Check if price element exists in modal or create
    let priceEl = document.getElementById('modalPriceBox');
    if (!priceEl) {
        priceEl = document.createElement('div');
        priceEl.id = 'modalPriceBox';
        priceEl.style.cssText = 'background:var(--frost); border:1px solid rgba(0,150,101,0.25); border-radius:12px; padding:12px 16px; margin:16px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px';
        const modalBody = document.querySelector('.modal-body');
        if (modalBody) {
            modalBody.insertBefore(priceEl, modalBody.children[1]);
        }
    }
    
    if (priceEl && data.price) {
        priceEl.innerHTML = `<span style="font-weight:800; color:var(--sky); font-size:0.95rem">💰 ${data.price}</span>
                             <span style="font-size:0.75rem; font-weight:700; background:var(--sky); color:#fff; padding:3px 8px; border-radius:4px">🛡️ ${data.warranty || '90-Day Warranty'}</span>`;
    }
    
    const list = document.getElementById('modalPoints');
    list.innerHTML = '';
    data.points.forEach(pt => {
        const li = document.createElement('li');
        li.innerText = pt;
        list.appendChild(li);
    });
    
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.07,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el=>obs.observe(el));
document.querySelectorAll('.svc-grid,.testi-grid,.amc-grid,.proc-grid').forEach(g=>{Array.from(g.children).forEach((c,i)=>c.style.transitionDelay=(i*.1)+'s')});

// CONTACT POPUP LOGIC
setTimeout(() => {
    const isHomePage = window.location.pathname === '/';
    const hasSeenPopup = localStorage.getItem('popupShown');
    
    const activeInTopForm = document.activeElement && document.activeElement.closest && document.activeElement.closest('#book-appointment');
    if (isHomePage && !hasSeenPopup && !activeInTopForm && window.scrollY > 500) {
        const popup = document.getElementById('contactModalOverlay');
        if(popup) {
            popup.classList.add('active');
            localStorage.setItem('popupShown', 'true');
        }
    }
}, 5000);

function closeContactModal() {
    const popup = document.getElementById('contactModalOverlay');
    if(popup) {
        popup.classList.remove('active');
    }
}

function submitPopupToWhatsapp() {
    const name = document.getElementById('pName').value;
    const phone = document.getElementById('pPhone').value;
    const area = document.getElementById('pArea').value;
    const details = document.getElementById('pDetails').value;
    
    if(!name || !phone || !area) {
        alert('Please fill in Your Name, Phone Number, and Area.');
        return;
    }
    
    const message = `*SK AC Repair Services - Booking Request*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Phone:* ${phone}\n` +
                    `*Area:* ${area}\n` +
                    `*Details:* ${details || 'N/A'}\n\n` +
                    `Please confirm my booking slot.`;
                    
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/917456884850?text=${encoded}`;
    
    window.location.href = waUrl;
}


// REVIEWS CATEGORY FILTERING & CAROUSEL
let currentReviewCategory = 'all';

function filterReviews(category, btn) {
    currentReviewCategory = category;
    
    document.querySelectorAll('.rf-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    
    const track = document.getElementById('reviewsTrack');
    const cards = document.querySelectorAll('.rc-card');
    if(!cards.length) return;
    
    cards.forEach(card => {
        const cats = (card.getAttribute('data-category') || '').split(' ');
        const matches = currentReviewCategory === 'all' || cats.includes(currentReviewCategory);
        if (matches) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    if (track) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
    }
}

function scrollReviewsCarousel(dir) {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;
    const card = track.querySelector('.rc-card:not(.hidden)');
    const cardWidth = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: cardWidth * dir, behavior: 'smooth' });
}


// TOP BOOK AN APPOINTMENT FORM SUBMISSION
function submitTopAppointment() {
    const nameEl = document.getElementById('apptName');
    const phoneEl = document.getElementById('apptPhone');
    const serviceEl = document.getElementById('apptService');
    const areaEl = document.getElementById('apptArea');
    const msgEl = document.getElementById('apptMessage');

    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const service = serviceEl ? serviceEl.value : '';
    const area = areaEl ? areaEl.value : '';
    const msg = msgEl ? msgEl.value.trim() : '';

    if (!name || !phone) {
        alert('Please enter Your Name and Phone Number to book an appointment.');
        return;
    }

    const message = `*SK AC Repair Services - New Appointment*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Phone:* ${phone}\n` +
                    `*Service:* ${service || 'AC / Appliance Service'}\n` +
                    `*Area:* ${area || 'Chandigarh / Mohali'}\n` +
                    (msg ? `*Message:* ${msg}\n` : '') +
                    `\nPlease confirm my doorstep appointment.`;

    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/917456884850?text=${encoded}`;
}
