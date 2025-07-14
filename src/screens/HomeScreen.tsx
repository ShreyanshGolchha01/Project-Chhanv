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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import SchemesScreen from './SchemesScreen';
import ProfileScreen from './ProfileScreen';
import ReportDetailsScreen from './ReportDetailsScreen';

// Sample data for next camps
const nextCamps = [
  {
    id: 1,
    date: '15 अगस्त 2025',
    location: 'प्राथमिक स्वास्थ्य केंद्र, रायपुर',
    time: 'सुबह 9:00 बजे',
    type: 'व्यापक स्वास्थ्य जांच शिविर'
  },
  {
    id: 2,
    date: '22 अगस्त 2025',
    location: 'सामुदायिक केंद्र, दुर्ग',
    time: 'सुबह 10:00 बजे',
    type: 'संपूर्ण परिवारिक स्वास्थ्य शिविर'
  },
  {
    id: 3,
    date: '29 अगस्त 2025',
    location: 'जिला अस्पताल, बिलासपुर',
    time: 'सुबह 8:30 बजे',
    type: 'मल्टी-स्पेशलिटी हेल्थ कैंप'
  }
];

// Sample data for previous reports
const previousReports = [
  {
    id: 1,
    date: '10 जुलाई 2025',
    type: 'व्यापक स्वास्थ्य जांच',
    status: 'सामान्य',
    doctor: 'डॉ. राम शर्मा',
    location: 'प्राथमिक स्वास्थ्य केंद्र'
  },
  {
    id: 2,
    date: '25 जून 2025',
    type: 'संपूर्ण पारिवारिक जांच',
    status: 'सामान्य',
    doctor: 'डॉ. सुनीता पटेल',
    location: 'सामुदायिक केंद्र'
  },
  {
    id: 3,
    date: '15 जून 2025',
    type: 'मल्टी-स्पेशलिटी चेकअप',
    status: 'ध्यान दें',
    doctor: 'डॉ. अमित गुप्ता',
    location: 'जिला अस्पताल'
  },
  {
    id: 4,
    date: '05 जून 2025',
    type: 'पूर्ण स्वास्थ्य परीक्षा',
    status: 'सामान्य',
    doctor: 'डॉ. प्रिया मिश्रा',
    location: 'मेडिकल कॉलेज'
  }
];

interface HomeScreenProps {
  userName: string;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showSchemes, setShowSchemes] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const renderContent = () => {
    if (showReportDetails) {
      return <ReportDetailsScreen onBack={() => setShowReportDetails(false)} reportData={selectedReport} />;
    }
    
    if (showSchemes) {
      return <SchemesScreen onBack={() => setShowSchemes(false)} />;
    }
    
    if (showProfile) {
      return <ProfileScreen onBack={() => setShowProfile(false)} onLogout={onLogout} />;
    }

    // Default home content
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>स्वागत है</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Next Camps Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>आगामी शिविर</Text>
          <FlatList
            data={nextCamps}
            renderItem={renderCampCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.campsList}
          />
        </View>

        {/* Previous Reports Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>पिछली रिपोर्ट्स</Text>
          <View style={styles.reportsGrid}>
            {previousReports.slice(0, 4).map((item, index) => (
              <View key={item.id} style={styles.reportCardWrapper}>
                {renderReportCard({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderCampCard = ({ item }: { item: any }) => (
    <LinearGradient
      colors={COLORS.gradients.card.colors}
      start={COLORS.gradients.card.start}
      end={COLORS.gradients.card.end}
      style={styles.campCard}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.campDate}>{item.date}</Text>
        <LinearGradient
          colors={COLORS.gradients.accent.colors}
          start={COLORS.gradients.accent.start}
          end={COLORS.gradients.accent.end}
          style={styles.statusBadge}
        >
          <Text style={styles.statusText}>नया</Text>
        </LinearGradient>
      </View>
      <Text style={styles.campType}>{item.type}</Text>
      <View style={styles.cardInfo}>
        <View style={styles.infoRow}>
          <LinearGradient
            colors={[COLORS.primary + '20', COLORS.primary + '10']}
            style={styles.iconContainer}
          >
            <Ionicons name="location" size={16} color={COLORS.primary} />
          </LinearGradient>
          <Text style={styles.campLocation}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <LinearGradient
            colors={[COLORS.primary + '20', COLORS.primary + '10']}
            style={styles.iconContainer}
          >
            <Ionicons name="time" size={16} color={COLORS.primary} />
          </LinearGradient>
          <Text style={styles.campTime}>{item.time}</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const getReportIconAndColor = (reportType: string) => {
    if (reportType.includes('व्यापक')) {
      return {
        icon: 'medical-services',
        colors: ['#8B5DFF', '#6B46C1'] as [string, string], // Purple
      };
    } else if (reportType.includes('संपूर्ण') || reportType.includes('पारिवारिक')) {
      return {
        icon: 'medical-services',
        colors: ['#3B82F6', '#1E40AF'] as [string, string], // Blue
      };
    } else if (reportType.includes('मल्टी') || reportType.includes('स्पेशलिटी')) {
      return {
        icon: 'medical-services',
        colors: ['#10B981', '#047857'] as [string, string], // Green
      };
    } else {
      return {
        icon: 'medical-services',
        colors: ['#F59E0B', '#D97706'] as [string, string], // Orange
      };
    }
  };

  const renderReportCard = ({ item }: { item: any }) => {
    const { icon, colors } = getReportIconAndColor(item.type);
    
    return (
      <TouchableOpacity 
        style={styles.reportCard}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedReport(item);
          setShowReportDetails(true);
        }}
      >
        <View style={styles.reportIconContainer}>
          <LinearGradient
            colors={colors}
            style={styles.reportIcon}
          >
            <MaterialIcons name={icon as any} size={18} color="white" />
          </LinearGradient>
        </View>
        <View style={styles.reportContent}>
          <Text style={styles.reportTitle} numberOfLines={2}>{item.type}</Text>
          <Text style={styles.reportSubtitle} numberOfLines={1}>{item.date}</Text>
          <Text style={styles.reportDescription} numberOfLines={1}>{item.doctor}</Text>
        </View>
        <TouchableOpacity 
          style={styles.detailButton}
          onPress={() => {
            setSelectedReport(item);
            setShowReportDetails(true);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.detailButtonText}>विस्तृत देखें</Text>
          <Ionicons name="chevron-forward" size={12} color={COLORS.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Header with Navigation */}
      <LinearGradient
        colors={COLORS.gradients.primary.colors}
        start={COLORS.gradients.primary.start}
        end={COLORS.gradients.primary.end}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            {showReportDetails ? 'विस्तृत रिपोर्ट' : 
             showProfile ? 'प्रोफाइल' : 
             showSchemes ? 'सरकारी योजनाएं' : 
             'स्वास्थ्य पोर्टल'}
          </Text>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => Alert.alert('सूचनाएं', 'कोई नई सूचना नहीं है।')}
            activeOpacity={0.7}
          >
            <View style={styles.notificationContainer}>
              <Ionicons name="notifications" size={24} color={COLORS.white} />
              <LinearGradient
                colors={['#e74c3c', '#c0392b']}
                style={styles.notificationBadge}
              >
                <Text style={styles.notificationCount}>3</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Dynamic Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]}
          onPress={() => {
            setActiveTab('home');
            setShowSchemes(false);
            setShowProfile(false);
            setShowReportDetails(false);
          }}
        >
          <Ionicons 
            name={activeTab === 'home' ? "home" : "home-outline"} 
            size={22} 
            color={activeTab === 'home' ? COLORS.primary : COLORS.textSecondary}
            style={[styles.navIcon, activeTab === 'home' && styles.activeNavIcon]} 
          />
          <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>होम</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'scheme' && styles.activeNavItem]}
          onPress={() => {
            setActiveTab('scheme');
            setShowSchemes(true);
            setShowProfile(false);
            setShowReportDetails(false);
          }}
        >
          <MaterialIcons 
            name="assignment" 
            size={22} 
            color={activeTab === 'scheme' ? COLORS.primary : COLORS.textSecondary}
            style={[styles.navIcon, activeTab === 'scheme' && styles.activeNavIcon]} 
          />
          <Text style={[styles.navText, activeTab === 'scheme' && styles.activeNavText]}>योजना</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'profile' && styles.activeNavItem]}
          onPress={() => {
            setActiveTab('profile');
            setShowProfile(true);
            setShowSchemes(false);
            setShowReportDetails(false);
          }}
        >
          <Ionicons 
            name={activeTab === 'profile' ? "person" : "person-outline"} 
            size={22} 
            color={activeTab === 'profile' ? COLORS.primary : COLORS.textSecondary}
            style={[styles.navIcon, activeTab === 'profile' && styles.activeNavIcon]} 
          />
          <Text style={[styles.navText, activeTab === 'profile' && styles.activeNavText]}>प्रोफाइल</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
  },
  notificationButton: {
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  notificationContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    // Icon styling handled by vector icon props
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.small,
  },
  notificationCount: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  welcomeSection: {
    paddingVertical: SPACING.lg,
  },
  welcomeText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  userName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  sectionContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  campsList: {
    paddingRight: SPACING.lg,
  },
  campCard: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginRight: SPACING.md,
    width: 320,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    ...SHADOWS.large,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
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
    fontWeight: FONTS.weights.semibold,
  },
  cardInfo: {
    marginBottom: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  iconContainerSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xs,
    ...SHADOWS.small,
  },
  iconContainerTiny: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xs / 2,
    ...SHADOWS.small,
  },
  infoIcon: {
    // Icon styling handled by vector icon props
  },
  campDate: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  campType: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  campLocation: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  campTime: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  reportsList: {
    paddingRight: SPACING.lg,
  },
  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reportCardWrapper: {
    width: '48%',
    marginBottom: SPACING.md,
  },
  reportCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    height: 180,
    ...SHADOWS.large,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportIconContainer: {
    marginBottom: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  reportContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  reportTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs / 2,
    lineHeight: 18,
  },
  reportSubtitle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs / 2,
  },
  reportDescription: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary + '10',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.xs / 2,
    paddingHorizontal: SPACING.xs,
    marginTop: SPACING.xs / 2,
  },
  detailButtonText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: FONTS.weights.semibold,
    marginRight: SPACING.xs / 3,
  },
  statusIndicator: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.small,
  },
  statusIndicatorCompact: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.small,
  },
  reportInfo: {
    marginBottom: SPACING.md,
  },
  reportInfoCompact: {
    marginBottom: SPACING.sm,
    flex: 1,
  },
  infoRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.xs,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  reportType: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.xs,
  },
  reportTypeCompact: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.xs / 2,
    lineHeight: 18,
    marginBottom: SPACING.xs,
  },
  reportStatus: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
  },
  reportStatusCompact: {
    fontSize: 9,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
  },
  reportDate: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  reportDateSmall: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    flex: 1,
  },
  reportDateTiny: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    flex: 1,
    fontWeight: FONTS.weights.medium,
  },
  reportDoctor: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  reportDoctorSmall: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    flex: 1,
  },
  reportDoctorTiny: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    flex: 1,
    fontWeight: FONTS.weights.medium,
  },
  reportTimeTiny: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  reportAttentionTiny: {
    fontSize: 9,
    color: COLORS.warning,
    fontStyle: 'italic',
  },
  dateTimeContainer: {
    flex: 1,
  },
  doctorContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: SPACING.xs,
  },
  reportLocation: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  viewReportButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
  },
  viewReportButtonSmall: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    marginTop: SPACING.xs,
  },
  viewReportButtonTiny: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
  },
  viewReportText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  viewReportTextSmall: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  viewReportTextTiny: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    ...SHADOWS.small,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
  },
  activeNavItem: {
    backgroundColor: COLORS.primary + '15',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  navIcon: {
    marginBottom: SPACING.xs,
  },
  activeNavIcon: {
    transform: [{ scale: 1.1 }],
  },
  navText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: FONTS.weights.medium,
  },
  activeNavText: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
});

export default HomeScreen;
