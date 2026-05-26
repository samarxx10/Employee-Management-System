import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Manage Employees',
    description:
      'Add, organize, and oversee your team from one central hub. Keep employee records structured and easy to access.',
    icon: '👥',
  },
  {
    title: 'Assign Tasks',
    description:
      'Create and delegate work with clear titles, deadlines, and categories. Track progress from new to completed.',
    icon: '📋',
  },
  {
    title: 'Leave Tracking',
    description:
      'Monitor time off and availability so scheduling stays balanced and your workforce stays informed.',
    icon: '📅',
  },
]

const ProjectShowcase = ({ onExploreAdmin, onExploreEmployee }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
            Employee Management System
          </p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">EMS</h1>
        </div>
        <Link
          to="/login"
          className="rounded-full border border-emerald-600 px-5 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-600 hover:text-white"
        >
          Sign in
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <section className="py-12 text-center md:py-20">
          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Run your team with
            <span className="block text-emerald-500">clarity and control</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            A modern workspace for admins and employees — manage people, assign work,
            and keep leave in sync without the clutter.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-emerald-900/60 bg-gradient-to-b from-[#111] to-black p-8 transition hover:border-emerald-600/80 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
            >
              <span className="text-4xl" role="img" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-emerald-400">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-emerald-800/50 bg-[#0a0a0a] p-10 text-center md:p-14">
          <h3 className="text-2xl font-bold md:text-3xl">See it in action</h3>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Jump straight into a live demo — no manual login required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onExploreAdmin}
              className="w-full max-w-xs rounded-full bg-emerald-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-emerald-500 sm:w-auto"
            >
              Explore Admin Dashboard
            </button>
            <button
              type="button"
              onClick={onExploreEmployee}
              className="w-full max-w-xs rounded-full border-2 border-emerald-600 px-8 py-3 text-base font-semibold text-emerald-400 transition hover:bg-emerald-600 hover:text-white sm:w-auto"
            >
              Explore Employee Dashboard
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectShowcase
