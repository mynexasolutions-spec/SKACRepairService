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

function submitToWhatsapp() {
    const name = document.getElementById('cName').value;
    const phone = document.getElementById('cPhone').value;
    const area = document.getElementById('cArea').value;
    const details = document.getElementById('cDetails').value;
    
    if(!name || !phone || !area) {
        alert('Please fill in Your Name, Phone Number, and Area.');
        return;
    }
    
    const message = `*SK AC Repair Services - Booking Request*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Phone:* ${phone}\n` +
                    `*Area:* ${area}\n` +
                    `*Details:* ${details || 'N/A'}\n\n` +
                    `Please confirm my booking.`;
                    
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

// MODAL LOGIC
const serviceDetails = {
    'ac-split': {
        title: 'AC Installation & Repair (Split & Window)',
        desc: 'Complete doorstep installation, uninstallation, servicing, and repair for all Split and Window AC brands across Chandigarh & Mohali.',
        points: [
            'New Split & Window AC installation & home-shifting uninstallation',
            'Foam-jet deep cleaning of indoor & outdoor coils',
            'Gas pressure check, leak repair & genuine gas charging',
            'PCB circuit board, capacitor & fan motor repair',
            'Water leakage & cooling efficiency optimization'
        ]
    },
    'copper-pipe': {
        title: 'Copper Pipe Fitting (Underground & Open)',
        desc: 'Expert heavy-gauge copper refrigerant piping for new constructions, renovations, builder floors, and commercial spaces.',
        points: [
            'Concealed wall-chasing & open surface copper pipe laying',
            '100% pure heavy-gauge copper pipes for long life',
            'High-density nitrile rubber thermal insulation sleeves',
            'Leak-proof brazing & nitrogen pressure testing',
            'Complete drain pipe & multi-core electrical cable setup'
        ]
    },
    'washing-machine': {
        title: 'Washing Machine Repair & Service',
        desc: 'Fast, reliable doorstep repair for Front-Load, Top-Load, and Semi-Automatic washing machines of all major brands.',
        points: [
            'Drum bearing, spider & motor repair',
            'Water inlet valve & drain pump replacement',
            'Spin cycle noise & heavy vibration fixing',
            'Digital PCB panel & sensor troubleshooting',
            'Door gasket & water leakage sealing'
        ]
    },
    'refrigerator': {
        title: 'Fridge Repair & Gas Charging',
        desc: 'Immediate diagnosis, gas charging, and cooling repair for Single-Door, Double-Door, and Side-by-Side refrigerators.',
        points: [
            '100% genuine refrigerator gas charging (R134a / R600a)',
            'Compressor testing, relay & overload replacement',
            'Freezer cooling & ice-buildup defrost sensor fix',
            'Thermostat & inverter PCB repair',
            'Door rubber gasket airtightness replacement'
        ]
    },
    'geyser': {
        title: 'Geyser Installation & Repair',
        desc: 'Safe wall mounting, plumbing connection, and electrical repair for storage and instant water heaters of all capacities.',
        points: [
            'New geyser wall installation & shifting uninstallation',
            'Heating element / coil replacement & descaling',
            'Thermostat & thermal cut-out safety repair',
            'Pressure release valve (PRV) & pipe leakage fix',
            'Complete earthing & electrical safety check'
        ]
    },
    'old-ac': {
        title: 'Old AC Buying (Sell Your Used AC)',
        desc: 'Get the highest instant cash or UPI value for your old, used, or scrap Split, Window, or Cassette air conditioners anywhere in Tricity.',
        points: [
            'Best market price for working & non-working ACs',
            'Free doorstep inspection & instant valuation',
            'Free safe uninstallation by trained technicians',
            'Immediate Cash / UPI payment before pickup',
            'Single home AC or bulk office/hotel AC lot buying'
        ]
    },
    'gas-charging': {
        title: 'AC & Fridge Gas Charging',
        desc: 'Restore brand-new ice-cold cooling with genuine refrigerant gas charging performed after proper leak testing and vacuuming.',
        points: [
            'R32, R410A, R22, R134a & R600a genuine refrigerants',
            'Pinpoint nitrogen & soap-bubble leak detection',
            'Copper joint brazing to permanently seal leaks',
            'Deep vacuum pump evacuation before gas refill',
            'Grill temperature & ampere load verification'
        ]
    },
    'ac-cassette': {
        title: 'Cassette & Commercial AC Systems',
        desc: 'Specialized installation, copper piping, and maintenance for ceiling-mounted cassette ACs and VRV/VRF commercial units.',
        points: [
            'Ceiling cassette mounting & four-way airflow check',
            'Condensate drain pump cleaning & float switch test',
            'Commercial copper piping & outdoor load balancing',
            'Showroom, office & restaurant cooling maintenance',
            'Customized Annual Maintenance Contracts (AMC)'
        ]
    },
    'maintenance': {
        title: 'Foam-Jet Wash & Preventive Maintenance',
        desc: 'Thorough high-pressure jet cleaning and seasonal tune-ups that boost cooling speed, clean indoor air, and cut power bills.',
        points: [
            'Jacket-protected indoor cooling coil foam-jet wash',
            'High-pressure outdoor condenser fin cleaning',
            'Drain tray & pipe flushing to prevent water drops',
            'Electrical terminal tightening & capacitor check',
            'Complete gas pressure & cooling performance audit'
        ]
    }
};

function showModal(id) {
    const data = serviceDetails[id];
    if(!data) return;
    
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDesc').innerText = data.desc;
    
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
    
    if (isHomePage && !hasSeenPopup) {
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
                    `Please confirm my booking.`;
                    
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/917456884850?text=${encoded}`;
    
    window.location.href = waUrl;
}
