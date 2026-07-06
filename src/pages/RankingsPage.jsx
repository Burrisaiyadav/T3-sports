import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RankingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-primary">Rankings</h1>
          <p className="text-muted-foreground">Global and local player rankings.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
