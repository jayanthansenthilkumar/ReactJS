import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Privacy Policy</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10">
                <p className="text-muted-foreground mb-4">
                  At Magzo Prime, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
                </p>
                <p className="text-muted-foreground">
                  By using our service, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
              
              <Accordion type="single" collapsible className="mb-10">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    1. Information We Collect
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                    </p>
                    <p>
                      Additionally, as you browse the site, we collect information about the individual web pages that you view, what websites or search terms referred you to the site, and information about how you interact with the site. We refer to this automatically-collected information as "Device Information."
                    </p>
                    <p>
                      We collect Device Information using the following technologies:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        "Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier.
                      </li>
                      <li>
                        "Log files" track actions occurring on the site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
                      </li>
                      <li>
                        "Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the site.
                      </li>
                    </ul>
                    <p>
                      When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    2. How We Use Your Information
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      We use the Order Information that we collect generally to fulfill any orders placed through the site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                    </p>
                    <p>
                      Additionally, we use this Order Information to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Communicate with you;</li>
                      <li>Screen our orders for potential risk or fraud;</li>
                      <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services;</li>
                      <li>Improve and optimize our site (for example, by generating analytics about how our customers browse and interact with the site);</li>
                      <li>Assess the success of our marketing and advertising campaigns.</li>
                    </ul>
                    <p>
                      We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our site.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    3. Sharing Your Information
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      We share your Personal Information with third parties to help us use your Personal Information, as described above.
                    </p>
                    <p>
                      For example, we use Google Analytics to help us understand how our customers use the site -- you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
                    </p>
                    <p>
                      We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    4. Behavioral Advertising
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.
                    </p>
                    <p>
                      You can opt out of targeted advertising by using the links below:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Facebook: https://www.facebook.com/settings/?tab=ads</li>
                      <li>Google: https://www.google.com/settings/ads/anonymous</li>
                      <li>Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    5. Your Rights
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.
                    </p>
                    <p>
                      Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
                    </p>
                    <p>
                      For California residents, the California Consumer Privacy Act (CCPA) provides you with specific rights regarding your personal information. This section describes your CCPA rights and explains how to exercise those rights.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    6. Data Retention
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      When you place an order through the site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    7. Changes to this Privacy Policy
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                    </p>
                    <p>
                      We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted, except that if we make material changes to this Privacy Policy we will notify you either through the email address you have provided us or by placing a prominent notice on our website.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    8. Children's Privacy
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      Our service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children under 13 without verification of parental consent, we take steps to remove that information from our servers.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-2xl font-serif font-medium">
                    9. Contact Us
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                    <p>
                      For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at privacy@magzoprime.com or by mail using the details provided below:
                    </p>
                    <p>
                      Magzo Prime, Inc.<br />
                      123 Book Avenue, Chicago, IL 60601, United States
                    </p>
                    <p>
                      You can also visit our <Link to="/contact" className="text-primary hover:underline">contact page</Link> to submit an inquiry.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
