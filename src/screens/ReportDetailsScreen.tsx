import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

// Sample comprehensive medical report data
const medicalReportData = {
  campInfo: {
    date: '10 जुलाई 2025',
    location: 'प्राथमिक स्वास्थ्य केंद्र, रायपुर',
    campType: 'व्यापक स्वास्थ्य जांच शिविर',
    doctor: 'डॉ. राम शर्मा',
    time: 'सुबह 9:00 - दोपहर 2:00'
  },
  employeeReport: {
    name: 'राज कुमार शर्मा',
    employeeId: 'CG2025001234',
    age: 38,
    bloodGroup: 'B+',
    tests: [
      { name: 'रक्तचाप', value: '120/80 mmHg', status: 'सामान्य', normalRange: '90/60 - 140/90' },
      { name: 'रक्त शर्करा (उपवास)', value: '95 mg/dL', status: 'सामान्य', normalRange: '70-100 mg/dL' },
      { name: 'हीमोग्लोबिन', value: '14.2 g/dL', status: 'सामान्य', normalRange: '13.8-17.2 g/dL' },
      { name: 'कोलेस्ट्रॉल', value: '185 mg/dL', status: 'सामान्य', normalRange: '<200 mg/dL' },
      { name: 'वजन', value: '72 kg', status: 'सामान्य', normalRange: '65-80 kg' },
      { name: 'बीएमआई', value: '23.5', status: 'सामान्य', normalRange: '18.5-24.9' },
      { name: 'नाड़ी दर', value: '75 bpm', status: 'सामान्य', normalRange: '60-100 bpm' },
      { name: 'श्वसन दर', value: '16/min', status: 'सामान्य', normalRange: '12-20/min' },
      { name: 'दृष्टि परीक्षण', value: '6/6', status: 'सामान्य', normalRange: '6/6' },
      { name: 'श्रवण परीक्षण', value: 'सामान्य', status: 'सामान्य', normalRange: 'सामान्य' }
    ]
  },
  familyReports: [
    {
      name: 'सुनीता शर्मा',
      relation: 'पत्नी',
      age: 35,
      bloodGroup: 'A+',
      tests: [
        { name: 'रक्तचाप', value: '115/75 mmHg', status: 'सामान्य', normalRange: '90/60 - 140/90' },
        { name: 'रक्त शर्करा (उपवास)', value: '88 mg/dL', status: 'सामान्य', normalRange: '70-100 mg/dL' },
        { name: 'हीमोग्लोबिन', value: '12.8 g/dL', status: 'सामान्य', normalRange: '12.1-15.1 g/dL' },
        { name: 'कोलेस्ट्रॉल', value: '175 mg/dL', status: 'सामान्य', normalRange: '<200 mg/dL' },
        { name: 'वजन', value: '58 kg', status: 'सामान्य', normalRange: '50-65 kg' },
        { name: 'बीएमआई', value: '22.1', status: 'सामान्य', normalRange: '18.5-24.9' },
        { name: 'नाड़ी दर', value: '72 bpm', status: 'सामान्य', normalRange: '60-100 bpm' },
        { name: 'श्वसन दर', value: '15/min', status: 'सामान्य', normalRange: '12-20/min' },
        { name: 'दृष्टि परीक्षण', value: '6/6', status: 'सामान्य', normalRange: '6/6' },
        { name: 'श्रवण परीक्षण', value: 'सामान्य', status: 'सामान्य', normalRange: 'सामान्य' }
      ]
    },
    {
      name: 'आर्यन शर्मा',
      relation: 'पुत्र',
      age: 12,
      bloodGroup: 'B+',
      tests: [
        { name: 'रक्तचाप', value: '105/65 mmHg', status: 'सामान्य', normalRange: '95/55 - 115/75' },
        { name: 'रक्त शर्करा (उपवास)', value: '85 mg/dL', status: 'सामान्य', normalRange: '70-100 mg/dL' },
        { name: 'हीमोग्लोबिन', value: '13.2 g/dL', status: 'सामान्य', normalRange: '11.5-15.5 g/dL' },
        { name: 'वजन', value: '38 kg', status: 'सामान्य', normalRange: '30-45 kg' },
        { name: 'ऊंचाई', value: '145 cm', status: 'सामान्य', normalRange: '140-155 cm' },
        { name: 'बीएमआई', value: '18.1', status: 'सामान्य', normalRange: '16-22' },
        { name: 'नाड़ी दर', value: '85 bpm', status: 'सामान्य', normalRange: '70-110 bpm' },
        { name: 'श्वसन दर', value: '18/min', status: 'सामान्य', normalRange: '16-25/min' },
        { name: 'दृष्टि परीक्षण', value: '6/6', status: 'सामान्य', normalRange: '6/6' },
        { name: 'टीकाकरण स्थिति', value: 'पूर्ण', status: 'सामान्य', normalRange: 'पूर्ण' }
      ]
    },
    {
      name: 'प्रिया शर्मा',
      relation: 'पुत्री',
      age: 8,
      bloodGroup: 'A+',
      tests: [
        { name: 'रक्तचाप', value: '100/60 mmHg', status: 'सामान्य', normalRange: '90/50 - 110/70' },
        { name: 'रक्त शर्करा (उपवास)', value: '82 mg/dL', status: 'सामान्य', normalRange: '70-100 mg/dL' },
        { name: 'हीमोग्लोबिन', value: '12.5 g/dL', status: 'सामान्य', normalRange: '11.5-14.5 g/dL' },
        { name: 'वजन', value: '26 kg', status: 'सामान्य', normalRange: '22-30 kg' },
        { name: 'ऊंचाई', value: '125 cm', status: 'सामान्य', normalRange: '120-135 cm' },
        { name: 'बीएमआई', value: '16.6', status: 'सामान्य', normalRange: '14-18' },
        { name: 'नाड़ी दर', value: '90 bpm', status: 'सामान्य', normalRange: '80-120 bpm' },
        { name: 'श्वसन दर', value: '20/min', status: 'सामान्य', normalRange: '18-30/min' },
        { name: 'दृष्टि परीक्षण', value: '6/6', status: 'सामान्य', normalRange: '6/6' },
        { name: 'टीकाकरण स्थिति', value: 'पूर्ण', status: 'सामान्य', normalRange: 'पूर्ण' }
      ]
    }
  ]
};

interface ReportDetailsScreenProps {
  onBack: () => void;
  reportData?: any;
}

const ReportDetailsScreen: React.FC<ReportDetailsScreenProps> = ({ onBack, reportData }) => {
  const [activeTab, setActiveTab] = useState('employee');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<any>(null);

  // Sort family members by age (oldest first)
  const sortedFamilyMembers = medicalReportData.familyReports.sort((a, b) => b.age - a.age);

  const renderFamilyMemberCard = (member: any) => (
    <TouchableOpacity
      key={member.name}
      style={styles.familyMemberCard}
      onPress={() => setSelectedFamilyMember(member)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={COLORS.gradients.card.colors}
        start={COLORS.gradients.card.start}
        end={COLORS.gradients.card.end}
        style={styles.memberCardGradient}
      >
        <View style={styles.memberCardHeader}>
          <LinearGradient
            colors={COLORS.gradients.accent.colors}
            start={COLORS.gradients.accent.start}
            end={COLORS.gradients.accent.end}
            style={styles.memberCardAvatar}
          >
            <FontAwesome5 
              name={member.relation === 'पत्नी' ? 'female' : 
                    member.relation === 'पुत्र' ? 'male' : 
                    member.relation === 'पुत्री' ? 'female' : 'user'} 
              size={24} 
              color={COLORS.white} 
            />
          </LinearGradient>
          
          <View style={styles.memberCardInfo}>
            <Text style={styles.memberCardName}>{member.name}</Text>
            <Text style={styles.memberCardRelation}>{member.relation}</Text>
            <View style={styles.memberCardDetails}>
              <Text style={styles.memberCardDetailText}>उम्र: {member.age} वर्ष</Text>
              <Text style={styles.memberCardDetailText}>ब्लड ग्रुप: {member.bloodGroup}</Text>
            </View>
          </View>
          
          <LinearGradient
            colors={[COLORS.primary + '20', COLORS.primary + '10']}
            style={styles.viewDetailsIcon}
          >
            <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
          </LinearGradient>
        </View>
        
        <View style={styles.memberCardFooter}>
          <View style={styles.testsSummary}>
            <LinearGradient
              colors={['#27ae60', '#2ecc71']}
              style={styles.testsCountBadge}
            >
              <Text style={styles.testsCountText}>{member.tests.length} टेस्ट</Text>
            </LinearGradient>
            <Text style={styles.testsSummaryText}>रिपोर्ट देखने के लिए क्लिक करें</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderFamilyMembersList = () => (
    <View style={styles.familyListContainer}>
      <View style={styles.familyListHeader}>
        <Text style={styles.familyListTitle}>परिवारिक सदस्य (उम्र के अनुसार)</Text>
        <Text style={styles.familyListSubtitle}>किसी भी सदस्य की विस्तृत रिपोर्ट देखने के लिए उन पर क्लिक करें</Text>
      </View>
      {sortedFamilyMembers.map(renderFamilyMemberCard)}
    </View>
  );

  const renderSelectedMemberDetails = () => {
    if (!selectedFamilyMember) return null;
    
    return (
      <View style={styles.selectedMemberContainer}>
        <TouchableOpacity 
          style={styles.backToListButton}
          onPress={() => setSelectedFamilyMember(null)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={COLORS.gradients.secondary.colors}
            start={COLORS.gradients.secondary.start}
            end={COLORS.gradients.secondary.end}
            style={styles.backToListGradient}
          >
            <Ionicons name="arrow-back" size={16} color={COLORS.white} />
            <Text style={styles.backToListText}>सभी सदस्य देखें</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {renderPersonCard(selectedFamilyMember, false)}
      </View>
    );
  };

  const renderTestResult = (test: any) => (
    <LinearGradient
      key={test.name}
      colors={COLORS.gradients.card.colors}
      start={COLORS.gradients.card.start}
      end={COLORS.gradients.card.end}
      style={styles.testCard}
    >
      <View style={styles.testHeader}>
        <Text style={styles.testName}>{test.name}</Text>
        <LinearGradient
          colors={test.status === 'सामान्य' ? 
            ['#27ae60', '#2ecc71'] : 
            test.status === 'ध्यान दें' ?
            ['#f39c12', '#e67e22'] :
            ['#e74c3c', '#c0392b']}
          style={styles.statusBadge}
        >
          <Text style={styles.statusText}>{test.status}</Text>
        </LinearGradient>
      </View>
      
      <View style={styles.testDetails}>
        <View style={styles.testRow}>
          <LinearGradient
            colors={[COLORS.primary + '20', COLORS.primary + '10']}
            style={styles.testIcon}
          >
            <FontAwesome5 name="chart-line" size={14} color={COLORS.primary} />
          </LinearGradient>
          <View style={styles.testInfo}>
            <Text style={styles.testLabel}>परिणाम</Text>
            <Text style={styles.testValue}>{test.value}</Text>
          </View>
        </View>
        
        <View style={styles.testRow}>
          <LinearGradient
            colors={[COLORS.info + '20', COLORS.info + '10']}
            style={styles.testIcon}
          >
            <MaterialIcons name="info" size={14} color={COLORS.info} />
          </LinearGradient>
          <View style={styles.testInfo}>
            <Text style={styles.testLabel}>सामान्य सीमा</Text>
            <Text style={styles.normalRange}>{test.normalRange}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  const renderPersonCard = (person: any, isEmployee: boolean = false) => (
    <View style={styles.personSection}>
      <LinearGradient
        colors={COLORS.gradients.primary.colors}
        start={COLORS.gradients.primary.start}
        end={COLORS.gradients.primary.end}
        style={styles.personHeader}
      >
        <LinearGradient
          colors={COLORS.gradients.accent.colors}
          start={COLORS.gradients.accent.start}
          end={COLORS.gradients.accent.end}
          style={styles.personAvatar}
        >
          <FontAwesome5 
            name={isEmployee ? 'user-tie' : 
                  person.relation === 'पत्नी' ? 'female' : 
                  person.relation === 'पुत्र' ? 'male' : 
                  person.relation === 'पुत्री' ? 'female' : 'user'} 
            size={28} 
            color={COLORS.white} 
          />
        </LinearGradient>
        
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{person.name}</Text>
          {isEmployee ? (
            <Text style={styles.personRole}>कर्मचारी ID: {person.employeeId}</Text>
          ) : (
            <Text style={styles.personRole}>{person.relation}</Text>
          )}
          <View style={styles.personDetails}>
            <Text style={styles.personDetailText}>उम्र: {person.age} वर्ष</Text>
            <Text style={styles.personDetailText}>ब्लड ग्रुप: {person.bloodGroup}</Text>
          </View>
        </View>
      </LinearGradient>
      
      <View style={styles.testsContainer}>
        {person.tests.map(renderTestResult)}
      </View>
    </View>
  );

  const renderContent = () => {
    if (activeTab === 'employee') {
      return renderPersonCard(medicalReportData.employeeReport, true);
    } else {
      if (selectedFamilyMember) {
        return renderSelectedMemberDetails();
      } else {
        return renderFamilyMembersList();
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={COLORS.gradients.primary.colors}
          start={COLORS.gradients.primary.start}
          end={COLORS.gradients.primary.end}
          style={styles.backButtonGradient}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.white} />
          <Text style={styles.backButtonText}>वापस जाएं</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Camp Info Card */}
      <LinearGradient
        colors={COLORS.gradients.card.colors}
        start={COLORS.gradients.card.start}
        end={COLORS.gradients.card.end}
        style={styles.campInfoCard}
      >
        <View style={styles.campInfoHeader}>
          <LinearGradient
            colors={COLORS.gradients.secondary.colors}
            start={COLORS.gradients.secondary.start}
            end={COLORS.gradients.secondary.end}
            style={styles.campIcon}
          >
            <FontAwesome5 name="hospital" size={20} color={COLORS.white} />
          </LinearGradient>
          <View style={styles.campInfoDetails}>
            <Text style={styles.campTitle}>{medicalReportData.campInfo.campType}</Text>
            <Text style={styles.campDate}>{medicalReportData.campInfo.date}</Text>
          </View>
        </View>
        
        <View style={styles.campDetails}>
          <View style={styles.campDetailRow}>
            <Ionicons name="location" size={16} color={COLORS.primary} />
            <Text style={styles.campDetailText}>{medicalReportData.campInfo.location}</Text>
          </View>
          <View style={styles.campDetailRow}>
            <FontAwesome5 name="user-md" size={14} color={COLORS.healthGreen} />
            <Text style={styles.campDetailText}>{medicalReportData.campInfo.doctor}</Text>
          </View>
          <View style={styles.campDetailRow}>
            <Ionicons name="time" size={16} color={COLORS.accent} />
            <Text style={styles.campDetailText}>{medicalReportData.campInfo.time}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'employee' && styles.activeTab]}
          onPress={() => setActiveTab('employee')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={activeTab === 'employee' ? 
              COLORS.gradients.primary.colors : 
              ['transparent', 'transparent']}
            style={styles.tabGradient}
          >
            <FontAwesome5 
              name="user-tie" 
              size={16} 
              color={activeTab === 'employee' ? COLORS.white : COLORS.textSecondary} 
            />
            <Text style={[
              styles.tabText, 
              activeTab === 'employee' && styles.activeTabText
            ]}>
              कर्मचारी
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'family' && styles.activeTab]}
          onPress={() => setActiveTab('family')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={activeTab === 'family' ? 
              COLORS.gradients.primary.colors : 
              ['transparent', 'transparent']}
            style={styles.tabGradient}
          >
            <Ionicons 
              name="people" 
              size={16} 
              color={activeTab === 'family' ? COLORS.white : COLORS.textSecondary} 
            />
            <Text style={[
              styles.tabText, 
              activeTab === 'family' && styles.activeTabText
            ]}>
              परिवार
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  campInfoCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    ...SHADOWS.large,
    elevation: 8,
  },
  campInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  campIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...SHADOWS.medium,
  },
  campInfoDetails: {
    flex: 1,
  },
  campTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  campDate: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
  campDetails: {
    marginTop: SPACING.sm,
  },
  campDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  campDetailText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  tab: {
    flex: 1,
    overflow: 'hidden',
  },
  activeTab: {
    // Styling handled by gradient
  },
  tabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  tabText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  personSection: {
    marginBottom: SPACING.xl,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  personAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  personRole: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white + 'CC',
    marginBottom: SPACING.xs,
  },
  personDetails: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  personDetailText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white + 'AA',
  },
  testsContainer: {
    marginBottom: SPACING.lg,
  },
  testCard: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    elevation: 4,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  testName: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.small,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
  },
  testDetails: {
    gap: SPACING.sm,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  testInfo: {
    flex: 1,
  },
  testLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs / 2,
  },
  testValue: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  normalRange: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  familyMemberCard: {
    marginBottom: SPACING.md,
  },
  memberCardGradient: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    elevation: 6,
  },
  memberCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  memberCardAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  memberCardInfo: {
    flex: 1,
  },
  memberCardName: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  memberCardRelation: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.accent,
    fontWeight: FONTS.weights.medium,
    marginBottom: SPACING.xs,
  },
  memberCardDetails: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  memberCardDetailText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  viewDetailsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  memberCardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    paddingTop: SPACING.md,
  },
  testsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  testsCountBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.small,
  },
  testsCountText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
  },
  testsSummaryText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  familyListContainer: {
    paddingBottom: SPACING.xl,
  },
  familyListHeader: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.sm,
  },
  familyListTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  familyListSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  selectedMemberContainer: {
    paddingBottom: SPACING.xl,
  },
  backToListButton: {
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    ...SHADOWS.small,
  },
  backToListGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  backToListText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    fontWeight: FONTS.weights.medium,
    marginLeft: SPACING.xs,
  },
  backButton: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    ...SHADOWS.medium,
  },
  backButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  backButtonText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    fontWeight: FONTS.weights.medium,
    marginLeft: SPACING.xs,
  },
});

export default ReportDetailsScreen;
