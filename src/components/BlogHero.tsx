import { ArrowRight, Scale } from "lucide-react";
import { motion } from "motion/react";

export function BlogHero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20 bg-gradient-to-br from-[#1a1d23] via-[#232730] to-[#1a1d23]">
      {/* Animated Background Gradients */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#6b7280] rounded-full blur-[120px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#f3f4f6] rounded-full blur-[100px] opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-block px-4 py-2 bg-gradient-to-r from-[#6b7280]/20 to-[#f3f4f6]/20 border border-[#6b7280]/30 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-[#9ca3af]">Selamat Datang di ritakartina.com</span>
              </motion.div>
              
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl text-white uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Dr. RITA KARTINA, S.H., M.H., M.AP
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-[#f3f4f6]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Sebagai Penulis dan Akademisi di Bidang Hukum, Saya Mendedikasikan Platform Ini untuk Memperdalam Pemahaman Atas Karya Tulis Terkait Hukum.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="#karya-tulis"
                className="px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg hover:shadow-[#6b7280]/50 transition-all flex items-center gap-2"
              >
                Lihat Karya Tulis
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#kontak"
                className="px-8 py-4 bg-[#f3f4f6]/10 border border-[#f3f4f6]/30 text-[#f3f4f6] rounded-xl hover:bg-[#f3f4f6]/20 transition-all"
              >
                Hubungi Saya
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Legal Symbol */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Rotating Circle Background */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#6b7280]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-[#9ca3af]/20 border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Center Scale Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Scale Icon */}
                  <motion.div
                    className="relative w-48 h-48 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-3xl flex items-center justify-center shadow-2xl"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Scale className="w-24 h-24 text-white" strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-[#9ca3af] rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Legal Text Elements */}
              <motion.div
                className="absolute top-1/4 -left-12 px-4 py-2 bg-[#3a3f47]/80 backdrop-blur-sm border border-[#6b7280]/30 rounded-lg text-[#f3f4f6] text-sm"
                animate={{
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Hukum Pidana
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-12 px-4 py-2 bg-[#3a3f47]/80 backdrop-blur-sm border border-[#6b7280]/30 rounded-lg text-[#f3f4f6] text-sm"
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                Hukum Tata Negara
              </motion.div>
              
              <motion.div
                className="absolute bottom-1/4 left-1/4 px-4 py-2 bg-[#3a3f47]/80 backdrop-blur-sm border border-[#6b7280]/30 rounded-lg text-[#f3f4f6] text-sm"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                Administrasi Publik
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-[#6b7280] rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}