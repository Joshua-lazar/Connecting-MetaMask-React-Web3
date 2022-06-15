import React from "react";

const Header = () => {
  return (
    <div>
      <section
        class="after:bg-jacarta-900/60 relative bg-cover bg-center bg-no-repeat py-24 after:absolute after:inset-0"
        style="background-image: url('./img/page-title/wallet_banner.jpg')"
      >
        <div class="container relative z-10">
          <h1 class="font-display text-center text-4xl font-medium text-white">
            Connect your wallet
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Header;
