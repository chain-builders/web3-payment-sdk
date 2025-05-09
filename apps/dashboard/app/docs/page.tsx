"use client";
import React from "react";

const DocsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col py-8 px-6">
        <h1 className="text-2xl font-clash-display font-bold mb-8 tracking-tight">
          Paytron Docs
        </h1>
        <nav className="flex flex-col gap-4">
          <a href="#introduction" className="hover:text-purple-400 transition-colors font-medium">
            Introduction
          </a>
          {/* Add more nav links here as you expand your docs */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-12 py-10">
        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-clash-display font-bold text-gray-900 mb-4">
            Introduction
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-clash-display font-semibold text-purple-700">Paytron</span> is a plug-and-play SDK, library, and widget designed to make accepting stablecoins in your app effortless.
          </p>
          <p className="text-gray-600">
            With Paytron, you can quickly integrate seamless stablecoin payments into your platform, enabling your users to transact with confidence and ease. Whether you’re building a web app, mobile app, or any digital product, Paytron provides the tools you need to accept USDT, USDC, and more with minimal setup.
          </p>
        </section>
        {/* Add more documentation sections here */}
      </main>
    </div>
  );
};

export default DocsPage;