import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  primaryBtn,
  secondaryBtn,
} from "../styles/common";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(user?.role === "AUTHOR" ? "/author-profile" : "/user-profile");
    } else {
      navigate("/register");
    }
  };

  const handleExploreArticles = () => {
    navigate("/user-profile");
  };

  const features = [
    {
      title: "Write & Share",
      description:
        "Create engaging articles and share your knowledge with the community.",
      icon: "✍️",
    },
    {
      title: "Discover Content",
      description:
        "Explore diverse topics from technology to lifestyle and beyond.",
      icon: "🚀",
    },
    {
      title: "Connect & Learn",
      description:
        "Engage with authors, leave comments, and grow together.",
      icon: "🤝",
    },
  ];

  const categories = [
    {
      name: "Technology",
      count: "25+ articles",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Programming",
      count: "18+ articles",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "AI & ML",
      count: "12+ articles",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Web Development",
      count: "20+ articles",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative px-6 py-24">

        {/* Background blur circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">

          <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
            <p className="text-sm tracking-wide text-cyan-300">
              ✨ Share Ideas. Inspire People.
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BlogSphere
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Discover insightful stories, share your expertise, and connect with
            a growing community of passionate readers and writers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button
              onClick={handleGetStarted}
              className={`${primaryBtn} px-8 py-3 text-lg shadow-xl hover:scale-105 transition-transform duration-300`}
            >
              {isAuthenticated ? "Go to Profile" : "Get Started"}
            </button>

            <button
              onClick={handleExploreArticles}
              className={`${primaryBtn} px-8 py-3 text-lg border border-white/20 backdrop-blur-md hover:bg-white/10 transition-all duration-300`}
            >
              Explore Articles
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Why People Love BlogSphere
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to write, explore, and engage in one modern platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 shadow-xl"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-4">
            Trending Categories
          </h2>

          <p className="text-gray-400 mb-12">
            Explore the most popular topics from our writers.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${category.gradient} p-[1px] rounded-2xl hover:scale-105 transition-transform duration-300`}
              >
                <div className="bg-[#111827] rounded-2xl py-8 px-5 h-full">
                  <h3 className="text-xl font-bold mb-2">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-300">
                    {category.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-500 to-blue-600 p-14 text-center shadow-2xl">

            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Share Your Story?
              </h2>

              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of writers and readers building meaningful conversations every day.
              </p>

              <button
                onClick={() => navigate("/register")}
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all duration-300 shadow-lg"
              >
                Join as Author
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;