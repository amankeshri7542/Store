import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#6d6875] mb-3">Contact Us</h2>
          <div className="w-20 h-1 bg-[#ffb4a2] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need a quote? Get in touch with us!
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="font-poppins font-semibold text-xl mb-6 text-[#6d6875]">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#ffcdb2] p-3 rounded-full mr-4">
                    <Phone className="text-[#b5838d]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#6d6875]">Phone Number</h4>
                    <p className="text-gray-600">9999999990</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffcdb2] p-3 rounded-full mr-4">
                    <MapPin className="text-[#b5838d]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#6d6875]">Address</h4>
                    <p className="text-gray-600">Shiv Cement Store, Teenpulva, Sipara, Patna-1</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffcdb2] p-3 rounded-full mr-4">
                    <Clock className="text-[#b5838d]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#6d6875]">Business Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="rounded-lg overflow-hidden shadow-md h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14399.37835508978!2d85.18026931539614!3d25.594948135787664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4af8a10f8e66c0be!2sSipara%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1633349868278!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                title="Shiv Cement Store Location"
              ></iframe>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-poppins font-semibold text-xl mb-6 text-[#6d6875]">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ffcdb2] focus:border-[#ffcdb2] transition-colors ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Your Name" 
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ffcdb2] focus:border-[#ffcdb2] transition-colors ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Your Phone Number" 
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ffcdb2] focus:border-[#ffcdb2] transition-colors ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Your Email Address" 
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ffcdb2] focus:border-[#ffcdb2] transition-colors ${errors.message ? "border-red-500" : "border-gray-300"}`}
                    placeholder="How can we help you?" 
                    {...register("message")}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#b5838d] hover:bg-[#e5989b] text-white py-3 px-6 rounded-md font-medium transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
