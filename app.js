// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const profileRoutes = require('./routes/profileRoutes');
const martialStatusRoutes = require('./routes/martialStatusRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const locationDetailsRoutes = require('./routes/locationDetailsRoutes');
const religiousInformationRoutes = require('./routes/religiousInformationRoutes');
const horoscopeInformationRoutes = require('./routes/horoscopeInformationRoutes');
const familyDetailsRoutes = require('./routes/familyDetailsRoutes');
const familyDetailsContinuedRoutes = require('./routes/familyDetailsContinuedRoutes');
const educationalInformationRoutes = require('./routes/educationalInformationRoutes'); 
const employmentDetailsRoutes = require('./routes/employmentDetailsRoutes'); 
const referencesVerificationRoutes = require('./routes/referencesVerificationRoutes'); 
const documentsVerificationRoutes = require('./routes/documentsVerificationRoutes'); 
const partnerPreferenceRoutes = require('./routes/partnerPreferenceRoutes'); 
const basicPreferencesRoutes = require('./routes/basicPreferencesRoutes'); 
const castePreferencesRoutes = require('./routes/castePreferencesRoutes'); 
const highestDegreePreferenceRoutes = require('./routes/highestDegreePreferenceRoutes'); 
const employmentPreferenceRoutes = require('./routes/employmentPreferenceRoutes'); 
const locationPreferencesRoutes = require('./routes/locationPreferencesRoutes'); 
// Use Middleware for validation if needed
// app.use(ValidationMiddleware.validateForm);

// Use Routes
app.use('/profile', profileRoutes);
app.use('/martialstatus', martialStatusRoutes);
app.use('/registration', registrationRoutes);
app.use('/locationdetails', locationDetailsRoutes);
app.use('/religiousinformation', religiousInformationRoutes);
app.use('/horoscopeinformation', horoscopeInformationRoutes);
app.use('/familydetails', familyDetailsRoutes);
app.use('/familydetailscontinued', familyDetailsContinuedRoutes);
app.use('/educationalinformation', educationalInformationRoutes); 
app.use('/employmentdetails', employmentDetailsRoutes); 
app.use('/referencesverification', referencesVerificationRoutes); 
app.use('/documentsverification', documentsVerificationRoutes); 
app.use('/partnerpreference', partnerPreferenceRoutes); 
app.use('/basicpreferences', basicPreferencesRoutes); 
app.use('/castepreferences', castePreferencesRoutes); 
app.use('/highestdegreepreference', highestDegreePreferenceRoutes); 
app.use('/employmentpreference', employmentPreferenceRoutes); 
app.use('/locationpreferences', locationPreferencesRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
