import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronRight } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Terms of Service</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-headings:font-serif">
              <div className="mb-10">
                <p className="text-muted-foreground">
                  Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Magzo Prime website (the "Service") operated by Magzo Prime, Inc. ("us", "we", or "our").
                </p>
                <p className="text-muted-foreground">
                  Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
                </p>
                <p className="text-muted-foreground">
                  By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you do not have permission to access the Service.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">1. Purchases</h2>
                <p className="text-muted-foreground mb-4">
                  If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
                </p>
                <p className="text-muted-foreground mb-4">
                  You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct, and complete.
                </p>
                <p className="text-muted-foreground">
                  The Service may employ the use of third-party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">2. Availability, Errors and Inaccuracies</h2>
                <p className="text-muted-foreground mb-4">
                  We are constantly updating product and service offerings on the Service. We may experience delays in updating information on the Service and in our advertising on other websites. The information found on the Service may contain errors or inaccuracies and may not be complete or current. Products or services may be mispriced, described inaccurately, or unavailable on the Service and we cannot guarantee the accuracy or completeness of any information found on the Service.
                </p>
                <p className="text-muted-foreground">
                  We therefore reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">3. Accounts</h2>
                <p className="text-muted-foreground mb-4">
                  When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
                </p>
                <p className="text-muted-foreground mb-4">
                  You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
                <p className="text-muted-foreground">
                  We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Magzo Prime, Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Magzo Prime, Inc.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">5. Links To Other Web Sites</h2>
                <p className="text-muted-foreground mb-4">
                  Our Service may contain links to third party web sites or services that are not owned or controlled by Magzo Prime, Inc.
                </p>
                <p className="text-muted-foreground mb-4">
                  Magzo Prime, Inc. has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
                </p>
                <p className="text-muted-foreground">
                  You acknowledge and agree that Magzo Prime, Inc. shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites or services.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">6. Termination</h2>
                <p className="text-muted-foreground mb-4">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
                <p className="text-muted-foreground mb-4">
                  If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
                <p className="text-muted-foreground">
                  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">7. Governing Law</h2>
                <p className="text-muted-foreground mb-4">
                  These Terms shall be governed and construed in accordance with the laws of Illinois, United States, without regard to its conflict of law provisions.
                </p>
                <p className="text-muted-foreground">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-medium mb-4">8. Changes</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-muted-foreground">
                  By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-medium mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
