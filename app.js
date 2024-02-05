const express = require('express');
const bodyParser = require('body-parser');
const mysqli = require('mysql');

// Forms
const userRoutes = require('./routes/userRoutes');
const locationDetailsRoutes = require('./routes/locationDetailsRoutes');
const religiousInformationRoutes = require('./routes/religiousInformationRoutes');
const horoscopeInformationRoutes = require('./routes/horoscopeInformationRoutes');
const familyDetailsRoutes = require('./routes/familyDetailsRoutes'); // Include FamilyDetails Routes
const educationalInfoRoutes = require('./routes/educationalInformationRoutes');
const employmentDetailsRoutes = require('./routes/employmentDetailsRoutes'); // Include Employment Details Routes
const referencesVerificationRoutes = require('./routes/referencesVerificationRoutes');
const documentsVerificationRoutes = require('./routes/documentsVerificationRoutes'); // Include Documents Verification Routes
const preferencesRoutes = require('./routes/preferencesRoutes');

// Dashboard
const matchesRoute = require('./routes/matches');
const viewsRoutes = require('./routes/views');
const shortlistsRoutes = require('./routes/shortlists');
const expressionsRoutes = require('./routes/expressions');

// Login
const authRoutes = require('./routes/auth');

// OTP
const OTPRoutes = require('./otp');


const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', locationDetailsRoutes);
app.use('/api', religiousInformationRoutes);
app.use('/api', horoscopeInformationRoutes);
app.use('/api', familyDetailsRoutes); // Use FamilyDetails Routes
app.use('/api', educationalInfoRoutes);
app.use('/api', employmentDetailsRoutes);
app.use('/api', referencesVerificationRoutes); 
app.use('/api', documentsVerificationRoutes); // Use Documents Verification Routes
app.use('/api', preferencesRoutes);

// Dashboard
app.use('/api/matches', matchesRoute);
app.use('/api', viewsRoutes);
app.use('/api', shortlistsRoutes);
app.use('/api', expressionsRoutes);

// Login
app.use('/api/auth', authRoutes);

// OTP
app.use('/otp', OTPRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
