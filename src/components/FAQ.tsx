import React from 'react';
import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Who is this course for?",
    answer: "Our courses are designed for both beginners and experienced professionals looking to upgrade their skills. Whether you're starting your career or aiming to advance, we have the right content for you."
  },
  {
    question: "Why should you do this course?",
    answer: "Our courses are crafted by industry experts, offering practical knowledge and hands-on experience. You'll gain real-world skills, receive a recognized certification, and have lifetime access to course materials."
  },
  {
    question: "What makes our courses different?",
    answer: "We focus on practical, industry-relevant content with personalized learning paths, interactive assignments, and dedicated mentor support throughout your learning journey."
  },
  {
    question: "How long do I have access to the course?",
    answer: "Once enrolled, you have lifetime access to all course materials, including future updates and improvements. Learn at your own pace without any time pressure."
  },
  {
    question: "Is there a certificate upon completion?",
    answer: "Yes! Upon successful completion of the course, you'll receive a verified digital certificate that you can share on your LinkedIn profile or with potential employers."
  }
];

export const FAQ = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our courses
          </p>
        </motion.div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion.Item
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm"
              >
                <Accordion.Trigger className="w-full flex justify-between items-center p-6 text-left">
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};