console.log('[modal.js] Loading...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('[modal.js] DOM ready');
  
  const modal = document.getElementById('gearModal');
  if (!modal) {
    console.error('[modal] Modal not found!');
    return;
  }

  const overlay   = modal.querySelector('.modal__backdrop');
  const closeBtn  = modal.querySelector('.modal__close');
  const leftCard  = document.getElementById('gmCardLeft');
  const rightCard = document.getElementById('gmCardRight');
  const leftImg   = document.getElementById('gmImgLeft');
  const rightImg  = document.getElementById('gmImgRight');
  const leftBack  = document.getElementById('gmBackLeft');
  const rightBack = document.getElementById('gmBackRight');

  // ==========================
  // PRODUCTS
  // ==========================
 const PRODUCTS = {
  // ========= SOCKS (verbatim) =========
  
  'socks-darntough': {
    leftImg: 'image/logos/darn-tough-2.jpg',
  rightImg: 'image/socks/darn-tough-red.jpg',
    leftText: `
     <div class="product-detail">
   
        <h2>Darn Tough</h2>
        <div class="features">
          <span class="feature-tag">🍃 Ultra Lightweight</span>
          <span class="feature-tag">🇺🇸 Made in Vermont</span>
          <span class="feature-tag">♾️ Lifetime Guarantee</span>
        </div>
        <p class="description">Fine-gauge Merino wool socks. Perfect for any season, any activity.</p>
      </div>
    `,
    rightText: `
     <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Run</summary>
          <ul>
            <li>No Show Tab Ultra-LightWeight</li>
            <li>No Show Tab Ultra-Lightweight-with Cushion</li>
            <li>1/4 sock Ultra-Lightweight with Cushion</li>
            
          </ul>
        </details>
        <details class="dropdown">
          <summary>LifeStyle</summary>
          <ul>
            <li>Crew Lightweight</li>
            <li>Crew Lightweight with Cushion</li>
           
          </ul>
        </details>
        <details class="dropdown">
          <summary>Hike</summary>
          <ul>
            <li>Boot Sock Midweight with Cushion</li>
            <li>Micro Crew Lightweigth with Cushion</li>
            
          </ul>
        </details>
      </div>
    `
  },
  'socks-jogology': {
    leftImg: 'image/logos/jogology-logo.webp',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
    <div class="product-detail">

  <h2>Jogology Socks</h2>
  <div class="features">
    <span class="feature-tag">♻️ Sustainable Re-Dri™ Yarn</span>
    <span class="feature-tag">🏃 Made by Runners</span>
    <span class="feature-tag">🧵 Seamless Design</span>
  </div>
  <p class="description">Performance running socks with recycled moisture-wicking yarn. Seamless construction prevents blisters.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Jogology</summary>
          <ul>
                   <li>No Show Ultra Light</li>
            <li>Crew</li>
         
          </ul>
        </details>
      
      </div>
    `
  },
  'socks-dttab': {
    leftImg: 'image/logos/1-balega-logo-1.jpg',
    rightImg: 'image/socks/balega-hidden-comfort.jpg',
    leftText: `
    <div class="product-detail">

  <h2>Balega</h2>
  <div class="features">
    <span class="feature-tag">🇺🇸 Drynamix™ Moisture Management</span>
    <span class="feature-tag">🇿🇦 Made in South Africa & USA</span>
    <span class="feature-tag">✋ Hand Inspected</span>
  </div>
  <p class="description">Running socks with plush cushioning and seamless construction. Deep heel pocket prevents slippage.</p>
</div>
    `,
    rightText: `
       <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Balega Socks</summary>
          <ul>
            <li>Hidden Comfort</li>
            <li>Enduro 1/4</li>
            <li>Enduro Crew</li>
            <li>Silver Crew</li>
          </ul>
        </details>
       
      </div>
    `
  },

  // ========= COLD WEATHER =========
  'head-bands': {
    leftImg: 'image/cold/Base-Headband-north-removebg-preview.png',
    rightImg: 'image/cold/Luxe_Thermal_Headband-removebg-preview.png',
    leftText: `
     <div class="product-detail">
  
  <h2>Thermal Headbands</h2>
  <div class="features">
    <span class="feature-tag">❄️ Windproof Exterior</span>
    <span class="feature-tag">🧵 Fleece-Lined Interior</span>
    <span class="feature-tag">🏃‍♂️ 4-Way Stretch Fit</span>
  </div>
  <p class="description">Keep your ears warm without overheating — perfect for cold runs and brisk mornings.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <details class="dropdown">
          <summary>North Face</summary>
          <ul>
            <li>Base Headband</li>
            <li>Cold Weather Handband</li>
         
          </ul>
        </details>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Luxe Thermal Headband</li>
               
            
          </ul>
        </details>
          <details class="dropdown">
          <summary>CEP</summary>
          <ul>
            <li>CEP Cold Weather Headband</li>
               
            
          </ul>
        </details>
      
      </div>
    `
  },
 'beanies': {
    leftImg: 'image/cold/Base-Beanie-removebg-preview.png',
    rightImg: 'image/cold/Womens-Oh-Mega-Fur-Pom-Lined-Beanie.jpg',
    leftText: `
     <div class="product-detail">
  
  <h2>Running Beanies</h2>
  <div class="features">
    <span class="feature-tag">🧣 Cozy</span>
    <span class="feature-tag">🫧 Breathable</span>
    <span class="feature-tag">🌫️ Wind-Resistant</span>
  </div>
  <p class="description">Lightweight, moisture-wicking warmth without bulk.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Our Hats</h2>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Notch Thermal Beanie</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>CEP</summary>
          <ul>
            <li>Hidden Gap for Ponytail</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>North Face</summary>
          <ul>
            <li>Base Beanie</li>
            <li>Fairisle Beanie</li>
            <li>W Oh Mega Pom BNE</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Headsweats</summary>
          <ul>
            <li>Fleet Feet Alpine</li>
            <li>Fleet Feet Alpine Reversible Beanie</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Kari Traa</summary>
          <ul>
            <li>Sundve Beanie</li>
          </ul>
        </details>
      </div>
    `
},
 'gloves': {
    leftImg: 'image/cold/Core-Run-Thermal-Gloves_Black_W5V25D_4x5_Transparent_01-removebg-preview.png',
    rightImg: 'image/cold/Fusion_Midweight_Glove_2.0-removebg-preview.png',
    leftText: `
    <div class="product-detail">
 
  <h2>Running Gloves</h2>
  <div class="features">
    <span class="feature-tag">📱 Touchscreen</span>
    <span class="feature-tag">💨 Wind Resistant</span>
    <span class="feature-tag">🧤 Thermal Lining</span>
  </div>
  <p class="description">Stay warm and connected on cold miles.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>CEP</summary>
          <ul>
            <li>Pro Run Gloves 2 in 1</li>
            <li>Core Run Thermal Gloves</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>North Face</summary>
          <ul>
            <li>ETIP Trail Glove</li>
            <li>Shelbe Raschel Etip Mitt</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Fusion Midweight Glove 2.0</li>
            <li>Shield Lobster Glove 2.0</li>
          </ul>
        </details>
      </div>
    `
},

  // ========= JACKETS =========
  'jackets-nb': {
    leftImg: 'image/jacket/northface/northface-summit-removebg-preview.png',
    rightImg: 'image/jacket/northface/lifestyle-northface-removebg-preview.png',
    leftText: `
     <div class="product-detail">
 
  <h2>The North Face</h2>
  <div class="features">
    <span class="feature-tag">💧 FUTURELIGHT™ Waterproof</span>
    <span class="feature-tag">🌬️ Breathable & Windproof</span>
    <span class="feature-tag">🏔️ Athlete-Tested</span>
  </div>
  <p class="description">Advanced breathable-waterproof technology for all-weather performance.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>North Face</summary>
          <ul>
            <li>Breithorn LT HYB HDY</li>
            <li>WW Pro Jacket</li>
            <li>Winter Warm Pro</li>
           
          </ul>
        </details>
       
      </div>
    `
  },
  'jackets-saucony': {
    leftImg: 'image/logos/asics-logo.png',
    rightImg: 'image/jacket/asics/asic-jacket-removebg-preview.png',
    leftText: `
     <div class="product-detail">

  <h2>Asics</h2>
  <div class="features">
    <span class="feature-tag">💨 Laser-Cut Ventilation</span>
    <span class="feature-tag">📦 Packable Design</span>
    <span class="feature-tag">🔆 Reflective Details</span>
  </div>
  <p class="description">Lightweight protection for fast-paced runs.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Asics</summary>
          <ul>
            <li>Road  Winter Jacket</li>
          
          </ul>
        </details>
       
      </div>
    `
  },
 'jackets-brooks': {
    leftImg: 'image/logos/brooks-logo-2.webp',
    rightImg: 'image/jacket/brooks/brooks-jacket-removebg-preview.png',
    leftText: `
     <div class="product-detail">
  
  <h2>Brooks Jackets</h2>
  <div class="features">
    <span class="feature-tag">💧 DriLayer® Seal</span>
    <span class="feature-tag">📦 Packable & Lightweight</span>
    <span class="feature-tag">🔆 3M™ Scotchlite™</span>
  </div>
  <p class="description">Reliable weather protection for serious runners.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Run Visible Jacket 2.0</li>
            <li>Run Visible Insulated Vest 2.0</li>
            <li>Fusion Hybrid Jacket 2.0</li>
            <li>Shield Hybrid Jacket 2.0</li>
          </ul>
        </details>
      </div>
    `
},

  // ========= WARM LAYERS =========
  'warm-thermal': {
    leftImg: 'image/warm-layers/long-sleeve/Sport_Essentials-removebg-preview.png',
    rightImg: 'image/warm-layers/saucony-truimph-lifestyle-removebg-preview.png',
    leftText: `
      <div class="product-detail">
 
  <h2>Thermal Base Layers</h2>
  <div class="features">
    <span class="feature-tag">💧 Moisture-Wicking</span>
    <span class="feature-tag">🔥 Temperature Regulation</span>
    <span class="feature-tag">🧵 Flatlock Seams</span>
  </div>
  <p class="description">Insulating warmth for cold weather training.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Quarter Zip</h2>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
           <li>Dash 1/2 Zip</li>
            
          </ul>
          </ul>
        </details>
        <details class="dropdown">
          <summary>North Face</summary>
          <ul>
               <li>Winter Warm Pro 1/4</li>
            <li>W CDR TR GRD FLC</li>
            <li>Yumiori</li>
            <li>Perf Fleece 1/4 Zip</li>
          </ul>
        </details>
         <details class="dropdown">
          <summary>New Balance </summary>
          <ul>
               <li>HT GRD Q ZP</li>
            <li>SE SD Q ZP</li>
            <li>Sport Essentials</li>
            <li>Perf Fleece 1/4 Zip</li>
          </ul>
        </details>
         <details class="dropdown">
          <summary>Saucony </summary>
          <ul>
            <li>Truimph 3D 1/2 Zip</li>
          
            
          </ul>
        </details>
      
      </div>
    `
  },
  'warm-fleece': {
    leftImg: 'image/warm-layers/tights/heat-high-rise-removebg-preview.png',
    rightImg: 'image/warm-layers/tights/thermal-pants-removebg-preview.png',
    leftText: `
   <div class="product-detail">
 
  <h2>Tights</h2>
  <div class="features">
    <span class="feature-tag">🔥 Thermal Insulation</span>
    <span class="feature-tag">💪 Light Compression</span>
    <span class="feature-tag">🧵 Flatlock Seams</span>
  </div>
  <p class="description">Soft, breathable warmth for active comfort.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>New Balance</summary>
          <ul>
           <li>NB Sleek Legging</li>
             <li>Athletic Heat Hi</li>
            
          </ul>
        </details>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
             <li>Momentum Thermal Jogger</li>
            <li>Momentum Thermal Tight</li>
          
          </ul>
        </details>
        
      </div>
    `
  },
  'warm-ls': {
    leftImg: 'image/warm-layers/long-sleeve/luxe-brooks-life-removebg-preview.png',
    rightImg: 'image/warm-layers/long-sleeve/new-balance-athletic-long-removebg-preview.png',
    leftText: `
     <div class="product-detail">
 
  <h2>Long Sleeve Tops</h2>
  <div class="features">
    <span class="feature-tag">💧 Moisture-Wicking</span>
    <span class="feature-tag">🌡️ Temperature Regulation</span>
    <span class="feature-tag">👍 Thumbholes</span>
  </div>
  <p class="description">Versatile layering for variable conditions.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Luxe Long Sleeve</li>
            <li>Notch Thermal Long Sleeve</li>
            
          
           
          
          </ul>
        </details>
        <details class="dropdown">
          <summary>New Balance</summary>
          <ul>
            <li>Athletic Long </li>
            
            
          </ul>
        </details>
      
      </div>
    `
  },

  // ========= NUTRITION =========
  'nutrition-hydration': {
    leftImg: 'image/nutrition/gu-chews.webp',
    rightImg: 'image/nutrition/jelly.webp',
    leftText: `
     <div class="product-detail">
 
  <h2>Chews</h2>
  <div class="features">
    <span class="feature-tag">⚡ Fast-Acting Carbs</span>
    <span class="feature-tag">💧 Electrolytes</span>
    <span class="feature-tag">📦 Portable & Mess-Free</span>
  </div>
  <p class="description">Quick energy and hydration on the move.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Chews</h2>
        <details class="dropdown">
          <summary>Gu</summary>
          <ul>
<li>Rainbow Fruit Mix</li>
<li>Lemonade</li>
<li>Blue Pomegranate</li>
<li>Strawberry</li>
<li>Orange</li>
<li>Watermelon</li>
<li>Salted Lime</li>
          <li>Fruit Punch</li>

          </ul>
        </details>
        <details class="dropdown">
          <summary>Honey Stinger</summary>
          <ul>
          <li>Fruit Smoothie</li>
<li>Acai Pomegranate</li>
<li>Gold</li>
<li>Strawberry</li>
<li>Salted Caramel</
          </ul>
        </details>
        <details class="dropdown">
          <summary>Jelly Belly</summary>
          <ul>
                     <li>Fruit Punch</li>
<li>Watermelon</li>
<li>Asssorted(extreme)</li>
<li>Assorted</li>
<li>Lemon Lime</li>
<li>Orange</li>
<li>Cherry</li>
          </ul>
        </details>
         
      </div>
    `
  },
  'nutrition-bars': {
    leftImg: 'image/logos/gu-logo.png',
    rightImg: 'image/nutrition/untapped-gel.webp',
    leftText: `
      <div class="product-detail">
 
  <h2>Gels</h2>
  <div class="features">
    <span class="feature-tag">⚡ Fast-Absorbing Carbs</span>
    <span class="feature-tag">📦 Portable Sachets</span>
    <span class="feature-tag">💧 Easy to Digest</span>
  </div>
  <p class="description">Concentrated energy for training and racing.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Gels</h2>
        <details class="dropdown">
          <summary>Gu</summary>
          <ul>
             <li>Lemon Sublime</li>
<li>Birthday Cake</li>
<li>Strawberry Banana</li>
<li>Rasberry Lemonade</li>
<li>Expresso Love</li>
<li>Salted Caramel</li>
<li>Salted Watermelon</li>
<li>Chocolate Fudge</li>
<li>Triberry</li>
<li>Mandarin Orange</li>
<li>Jet Blackberry</li>
<li>Campfire S'mores</li>
<li>Caramel Macchiato</li>
<li>Vanilla Bean</li>

          </ul>
        </details>
    
        <details class="dropdown">
          <summary>Honey Stinger</summary>
          <ul>
         <li>Pink Lemonade</li>
<li>Pomegranate Passion Fruit</li>
<li>Citrus Splash</li>
<li>Cherry Cola</li>
<li>OrangeBlossom</li>
<li>Fruit Punch</li>
<li>Stingerita Lime</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Untapped</summary>
          <ul>
            <li>Grape Mapleaid</li>
<li>Lemon Tea</li>
<li>ginger</li>
<li>Lime</li>
<li>Mapleaid</li>
<li>Salted Rasberry</li>
<li>Salted Ccoa</li>
<li>Bourbon Barrel Aged</li>
<li>Salted Citrus</li>
          </ul>
        </details>
        
      </div>
    `
  },
  'nutrition-recovery': {
    leftImg: 'image/nutrition/maurten.webp',
    rightImg: 'image/nutrition/nuun.webp',
    leftText: `
     <div class="product-detail">

  <h2>Recovery Nutrition</h2>
  <div class="features">
    <span class="feature-tag">🥤 Carb-Protein Ratio 3:1</span>
    <span class="feature-tag">💪 Muscle Repair</span>
    <span class="feature-tag">⏱️ 30-Minute Window</span>
  </div>
  <p class="description">Post-run fuel for optimal recovery.</p>
</div
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Nuun</summary>
          <ul>
             <li>Citrus Fruit</li>
<li>Orange</li>
<li>Tropical</li>
<li>Watermelon</li>
<li>Tri-berry</li>
<li>Grape</li>
<li>Mango Orange</li>
<li>Fresh Lime</li>
<li>Wild Berry</li>
<li>Cherry Limeade</li>
<li>Watermelon Burst</li>
<li>Tropical Punch</li>
<li>Fresh Lime</li>
<li>Berry Blast</li>
<li>Tangerine Lime</li>
<li>Strawberry Lime</li>
<li>Blueberry Pomegranete</li>
<li>Blue Tangerine</li>
<li>OrangeCitrus</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Tail Wind</summary>
          <ul>
         <li>Tropical</li>
<li>Mandarin</li>
<li>Dauwaltermelon</li>
<li>Berry</li>
<li>Lemon</li>
<li>Raspberry</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Maurtin</summary>
          <ul>
                   <li>Marten gel 100</li>
<li>Drink mix 160</li>
<li>Drink mix 320 can 320</li>

          </ul>
        </details>
        <details class="dropdown">
          <summary>Hoist</summary>
          <ul>
           <li>Citrus Fruit</li>
<li>Orange</li>
<li>Tropical</li>
<li>Watermelon</li>
<li>Tri-berry</li>
<li>Grape</li>
<li>Mango Orange</li>
<li>Fresh Lime</li>
<li>Wild Berry</li>
<li>Cherry Limeade</li>
<li>Watermelon Burst</li>
<li>Tropical Punch</li>
<li>Fresh Lime</li>
<li>Berry Blast</li>
<li>Tangerine Lime</li>
<li>Strawberry Lime</li>
<li>Blueberry Pomegranete</li>
<li>Blue Tangerine</li>
<li>OrangeCitrus</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= ELECTRONICS =========
  'elec-headphones': {
    leftImg: 'image/logos/shokz-logo.png',
    rightImg: 'image/electronics/shokz-openswim.webp',
    leftText: `
     <div class="product-detail">

  <h2>Headphones</h2>
  <div class="features">
    <span class="feature-tag">💧 IPX4-IPX7 Sweat-Resistant</span>
    <span class="feature-tag">🔋 Long Battery Life</span>
    <span class="feature-tag">🎧 Secure Fit</span>
  </div>
  <p class="description">Wireless audio for distraction-free miles.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Shokz</summary>
          <ul>
            <li>Open Move</li>
            <li>Open Pro 2</li>
            <li>Open Fit</li>
            <li>Open Swim</li>
          </ul>
        </details>
       
      </div>
    `
  },
  'elec-lights': {
    leftImg: 'image/logos/garmin-logo.png',
    rightImg: 'image/electronics/forerunner.webp',
    leftText: `
     <div class="product-detail">

  <h2>Garmin Watches</h2>
  <div class="features">
    <span class="feature-tag">📊 Advanced Metrics</span>
    <span class="feature-tag">🗺️ GPS Tracking</span>
    <span class="feature-tag">🔋 Multi-Day Battery</span>
  </div>
  <p class="description">Precision training and performance tracking.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Garmin</summary>
          <ul>
            <li>Forerunner 165 Music</li>
            <li>Forerunner 265s</li>
          
          </ul>
        </details>
        
       
      </div>
    `
  },
  'elec-watches': {
    leftImg: 'image/logos/thera-logo.png',
    rightImg: 'image/electronics/theragun-prim.webp',
    leftText: `
    <div class="product-detail">
 
  <h2>Massage Guns</h2>
  <div class="features">
    <span class="feature-tag">💪 Deep Tissue Relief</span>
    <span class="feature-tag">🔇 Quiet Operation</span>
    <span class="feature-tag">⚡ Multiple Speed Settings</span>
  </div>
  <p class="description">Targeted muscle recovery and tension relief.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Thera</summary>
          <ul>
            <li>Thera Gun Mini</li>
            <li>Thera Gun Prime</li>
            
          </ul>
        </details>
       
      </div>
    `
  },

  // ========= LULULEMON =========
  'lulu-bottoms': {
    leftImg: 'image/lululemon/METAL-VENT-lulu-removebg-preview.png',
    rightImg: 'image/lululemon/Pace-Breaker-Ripstop-Jacket-lulu-removebg-preview.png',
    leftText: `
    <div class="product-detail">

  <h2>Lululemon Jackets</h2>
  <div class="features">
    <span class="feature-tag">🌧️ Weather Resistant</span>
    <span class="feature-tag">🏃 4-Way Stretch</span>
    <span class="feature-tag">💨 Breathable Fabric</span>
  </div>
  <p class="description">Premium athletic jackets for running and training.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Jacket</summary>
          <ul>
            <li>Pace Breaker Ripstop</li>
            <li>Metal Vent Tech Half Zip</li>
            
          </ul>
        </details>
       
      </div>
    `
  },
  'lulu-accessories': {
    leftImg: 'image/lululemon/It_s-rulu-cropped-half-removebg-preview.png',
    rightImg: 'image/lululemon/to_train-lulu-removebg-preview.png',
    leftText: `
      <div class="product-detail">
  
  <h2>Warm Layers</h2>
  <div class="features">
    <span class="feature-tag">🔥 Thermal Insulation</span>
    <span class="feature-tag">💧 Moisture-Wicking</span>
    <span class="feature-tag">🎯 Lightweight Warmth</span>
  </div>
  <p class="description">Essential base layers and mid-layers for cold weather training.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Warm Layers</summary>
          <ul>
            <li>Adapted State Textured Jacket</li>
            <li>It's Rulu Run Ribbed Cropped Half Zip</li>
            <li>Its's Rulu Half Zip</li>
            <li>License to Train Hoodie</li>
          </ul>
        </details>
        
      </div>
    `
  },
  'lulu-outerwear': {
    leftImg: 'image/lululemon/fast_and_free-removebg-preview.png',
    rightImg: 'image/lululemon/high-rise-removebg-preview.png',
    leftText: `
     <div class="product-detail">

  <h2>Pants</h2>
  <div class="features">
    <span class="feature-tag">🏃 Flexible Fit</span>
    <span class="feature-tag">💨 Breathable Fabric</span>
    <span class="feature-tag">📏 Tapered Design</span>
  </div>
  <p class="description">Comfortable running and training pants for all conditions.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Pants</h2>
        <details class="dropdown">
          <summary>Pants</summary>
          <ul>
            <li>Fast and Free HR Tight 25 *Pockets</li>
            <li>Wunder Train HR Tight 25 *Pockets</li>
            <li>Pace Breaker Luxtreme Track Pant *Reg</li>
          </ul>
        </details>
        
      </div>
    `
  },

  // ========= RABBIT =========
  'rabbit-tops': {
    leftImg: 'image/rabbit/cocoon-removebg-preview.png',
    rightImg: 'image/rabbit/warm_up-rabbit-removebg-preview.png',
    leftText: `
      <div class="product-detail">
 
  <h2>Rabbit Jackets</h2>
  <div class="features">
    <span class="feature-tag">🪶 Ultralight Construction</span>
    <span class="feature-tag">🌬️ Wind Resistant</span>
    <span class="feature-tag">🏃 Runner-Designed Fit</span>
  </div>
  <p class="description">Feathery soft, technical jackets made by runners for runners.</p>
</div>
    `,
    rightText: `
       <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Jacket</summary>
          <ul>
            <li>Evening Promrose</li>
            <li>Low Light Momentum Jacket</li>
            <li>Warm Up N'Go</li>
            <li>Cocoon 2.0</li>
          </ul>
        </details>
       
      </div>
    `
  },
  'rabbit-gear': {
    leftImg: 'image/rabbit/layer-one-removebg-preview.png',
    rightImg: 'image/rabbit/defroster-removebg-preview.png',
    leftText: `
    <div class="product-detail">
  
  <h2>Rabbit Gear</h2>
  <div class="features">
    <span class="feature-tag">🎽 Performance Shorts</span>
    <span class="feature-tag">🧢 Lightweight Caps</span>
    <span class="feature-tag">⚡ Speed-Focused Design</span>
  </div>
  <p class="description">Essential running accessories built for comfort and speed.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Warm Layers</h2>
        <details class="dropdown">
          <summary>Gear 1</summary>
          <ul>
            <li>Layer One Zip</li>
            <strong><underline>Pants</underline></strong>
            <li>DeFroster Speed Tights</li>
           
          </ul>
        </details>
        
      </div>
    `
  },
  'rabbit-accessories': {
    leftImg: 'image/rabbit/layer-one-blue-removebg-preview.png',
    rightImg: 'image/rabbit/layer-one-pink-removebg-preview.png',
    leftText: `
   <div class="product-detail">
 
  <h2>Rabbit Long Sleeve</h2>
  <div class="features">
    <span class="feature-tag">☀️ Sun Protection</span>
    <span class="feature-tag">💨 Moisture-Wicking</span>
    <span class="feature-tag">🏃 Comfortable Fit</span>
  </div>
  <p class="description">Versatile long sleeve shirts for year-round training.</p>
</div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Long Sleeve</summary>
          <ul>
            <li>Layer One</li>
           
          </ul>
        </details>
    
      </div>
    `
  },

  // ========= INJURY PREVENTION =========
  'injury-massage': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Recovery</span>
        <h2>Massage Tools</h2>
        <p class="description">Rollers and percussion for sore spots.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Tool 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Tool 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Tool 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'injury-compression': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Recovery</span>
        <h2>Compression</h2>
        <p class="description">Targeted support for calves and ankles.</p>
      </div>
    `,
    rightText: `
       <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Compression 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Compression 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Compression 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'injury-super-feet': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Recovery</span>
        <h2>Super Feet</h2>
        <p class="description">Work smarter between sessions.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <details class="dropdown">
          <summary>Super Feet We Carry</summary>
          <ul class="carry-list">
            <li>Green</li>
            <li>Pink</li>
            <li>Blue</li>
            <li>Orange</li>
            <li>Dynamic</li>
            <li>Green Hiking</li>
            <li>Hiking Pink</li>
            <li>Copper</li>
            <li>Grey</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= FALLBACK =========
  default: {
    leftImg: 'image/logos/darn-tough-2.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `<div class="product-detail"><h2>Featured Product</h2></div>`,
    rightText: `<div class="product-detail"><h2>Visit Us</h2></div>`
  }
};

  // ==========================
  // PAGE-SCOPED ITEM MAP (all 9 pages)
  // ==========================
  const ITEM_MAP = {
    'Running Socks': {
      darntough: 'socks-darntough',
      jogology:  'socks-jogology',
      dttab:     'socks-dttab',
    },
    'Cold Weather': {
      'head-bands': 'head-bands',
      beanies:      'beanies',
      gloves:       'gloves',
    },
    'Jackets': {
      darntough: 'jackets-nb',
      jogology:  'jackets-saucony',
      dttab:     'jackets-brooks',
    },
    'Warm Layers': {
      darntough: 'warm-thermal',
      jogology:  'warm-fleece',
      dttab:     'warm-ls',
    },
    'Nutrition': {
      darntough: 'nutrition-hydration',
      jogology:  'nutrition-bars',
      dttab:     'nutrition-recovery',
    },
    'Electronics': {
      darntough: 'elec-headphones',
      jogology:  'elec-lights',
      dttab:     'elec-watches',
    },
    'Lululemon': {
      darntough: 'lulu-bottoms',
      jogology:  'lulu-accessories',
      dttab:     'lulu-outerwear',
    },
    'Rabbit': {
      darntough: 'rabbit-tops',
      jogology:  'rabbit-gear',
      dttab:     'rabbit-accessories',
    },
    'Injury Prevention': {
      darntough: 'injury-massage',
      jogology:  'injury-compression',
      dttab:     'injury-super-feet',
    },
  };

  // ==========================
  // Modal open/close
  // ==========================
  function openModal(productKey) {
    console.log('[modal] Opening:', productKey);
    const data = PRODUCTS[productKey] || PRODUCTS.default;
    
    if (leftImg)  leftImg.src  = data.leftImg;
    if (rightImg) rightImg.src = data.rightImg;
    if (leftBack)  leftBack.innerHTML  = data.leftText;
    if (rightBack) rightBack.innerHTML = data.rightText;
    
    if (leftCard)  leftCard.classList.remove('is-flipped');
    if (rightCard) rightCard.classList.remove('is-flipped');
    
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    
    console.log('[modal] Opened');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });
  if (overlay) overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // ==========================
  // Card flip (with guard to ignore dropdown area)
  // ==========================
  function setupCardFlip(card) {
    if (!card) return;
    card.addEventListener('click', (e) => {
      // If click originated inside product-detail (dropdowns, labels, etc.), ignore
      if (e.target.closest('.product-detail')) return;
      e.stopPropagation();
      card.classList.toggle('is-flipped');
    });
  }
  setupCardFlip(leftCard);
  setupCardFlip(rightCard);

  // ==========================
  // Tile listeners (mobile + desktop)
  // ==========================
  function attachTileListeners() {
    const tiles = document.querySelectorAll('.gear-tile');
    console.log('[modal] Found tiles:', tiles.length);
    
    tiles.forEach((tile) => {
      const page = tile.closest('.page');
      const pageTitle = page ? (page.getAttribute('data-title') || '').trim() : '';
      const item = tile.getAttribute('data-item');

      // Resolve via page map → raw item → default
      const sectionMap = ITEM_MAP[pageTitle] || {};
      let productKey = sectionMap[item] || item;
      if (!PRODUCTS[productKey]) {
        console.warn('[modal] No PRODUCT for key:', productKey, '(page:', pageTitle, 'item:', item, ') — using default');
        productKey = 'default';
      }

      tile.dataset.modalProduct = productKey; // for debugging

      // Mobile: capture taps
      tile.addEventListener('touchstart', (e) => {
        const now = Date.now();
        tile.dataset.touchStartTime = now.toString();
        tile.dataset.touchStartX = e.touches[0].clientX.toString();
        tile.dataset.touchStartY = e.touches[0].clientY.toString();
      }, { capture: true, passive: true });
      
      tile.addEventListener('touchend', (e) => {
        if (!tile.dataset.touchStartTime) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openModal(productKey);
          return;
        }
        const startTime = parseInt(tile.dataset.touchStartTime, 10);
        const startX = parseFloat(tile.dataset.touchStartX);
        const startY = parseFloat(tile.dataset.touchStartY);
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const duration = Date.now() - startTime;
        const distance = Math.hypot(endX - startX, endY - startY);

        if (duration < 800 && distance < 50) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openModal(productKey);
        }

        delete tile.dataset.touchStartTime;
        delete tile.dataset.touchStartX;
        delete tile.dataset.touchStartY;
      }, { capture: true, passive: false });

      // Desktop click (guard against clicks inside an embedded product-detail)
      tile.addEventListener('click', (e) => {
        if (e.target.closest('.product-detail')) return;
        e.stopPropagation();
        openModal(productKey);
      });
    });
    
    console.log('[modal] Listeners attached');
  }

  // Delay to allow other scripts to attach
  setTimeout(attachTileListeners, 200);

  // ==========================
  // Delegated guards inside modal (capture)
  // - Prevent dropdown/label interactions from bubbling to flips or tiles
  // - Works for dynamically-inserted content (via innerHTML)
  // ==========================
  (function installModalGuards() {
    const SAFE_SELECTOR = '.product-detail, .product-detail *';
    const stopEvents = [
      'click',
      'mousedown','mouseup',
      'pointerdown','pointerup',
      'touchstart','touchend',
      'keydown','keyup'
    ];
    stopEvents.forEach(evt => {
      modal.addEventListener(evt, (e) => {
        if (e.target.closest(SAFE_SELECTOR)) {
          // Contain event without breaking native control behavior
          e.stopPropagation();
          e.stopImmediatePropagation?.();
        }
      }, { capture: true, passive: evt.startsWith('touch') ? true : false });
    });
  })();

  console.log('[modal] Setup complete');

});

