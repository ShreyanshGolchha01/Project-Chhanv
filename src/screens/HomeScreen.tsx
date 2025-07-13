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
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

// Sample data for next camps
const nextCamps = [
  {
    id: 1,
    date: '15 अगस्त 2025',
    location: 'प्राथमिक स्वास्थ्य केंद्र, रायपुर',
    time: 'सुबह 9:00 बजे',
    type: 'सामान्य जांच शिविर'
  },
  {
    id: 2,
    date: '22 अगस्त 2025',
    location: 'सामुदायिक केंद्र, दुर्ग',
    time: 'सुबह 10:00 बजे',
    type: 'नेत्र जांच शिविर'
  },
  {
    id: 3,
    date: '29 अगस्त 2025',
    location: 'जिला अस्पताल, बिलासपुर',
    time: 'सुबह 8:30 बजे',
    type: 'हृदय जांच शिविर'
  }
];

// Sample data for previous reports
const previousReports = [
  {
    id: 1,
    date: '10 जुलाई 2025',
    type: 'रक्त जांच',
    status: 'सामान्य',
    doctor: 'डॉ. राम शर्मा',
    location: 'प्राथमिक स्वास्थ्य केंद्र'
  },
  {
    id: 2,
    date: '25 जून 2025',
    type: 'ब्लड प्रेशर',
    status: 'सामान्य',
    doctor: 'डॉ. सुनीता पटेल',
    location: 'सामुदायिक केंद्र'
  },
  {
    id: 3,
    date: '15 जून 2025',
    type: 'मधुमेह जांच',
    status: 'ध्यान दें',
    doctor: 'डॉ. अमित गुप्ता',
    location: 'जिला अस्पताल'
  },
  {
    id: 4,
    date: '05 जून 2025',
    type: 'नेत्र जांच',
    status: 'सामान्य',
    doctor: 'डॉ. प्रिया मिश्रा',
    location: 'नेत्र चिकित्सालय'
  }
];

interface HomeScreenProps {
  userName: string;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const renderCampCard = ({ item }: { item: any }) => (
    <View style={styles.campCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.campDate}>{item.date}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>नया</Text>
        </View>
      </View>
      <Text style={styles.campType}>{item.type}</Text>
      <View style={styles.cardInfo}>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.campLocation}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="time" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.campTime}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  const renderReportCard = ({ item }: { item: any }) => (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportType}>{item.type}</Text>
        <View style={[
          styles.statusIndicator,
          { backgroundColor: item.status === 'सामान्य' ? COLORS.healthGreen : COLORS.warning }
        ]}>
          <Text style={styles.reportStatus}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.reportInfo}>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.reportDate}>{item.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user-md" size={14} color={COLORS.primary} />
          </View>
          <Text style={styles.reportDoctor}>{item.doctor}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="hospital" size={14} color={COLORS.primary} />
          </View>
          <Text style={styles.reportLocation}>{item.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.viewReportButton} activeOpacity={0.8}>
        <Text style={styles.viewReportText}>विस्तार देखें</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Header with Navigation */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>स्वास्थ्य पोर्टल</Text>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => Alert.alert('सूचनाएं', 'कोई नई सूचना नहीं है।')}
            activeOpacity={0.7}
          >
            <View style={styles.notificationContainer}>
              <Ionicons name="notifications" size={24} color={COLORS.white} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

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
          <FlatList
            data={previousReports}
            renderItem={renderReportCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reportsList}
            inverted // This makes it scroll right to left
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]}
          onPress={() => setActiveTab('home')}
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
          onPress={() => setActiveTab('scheme')}
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
            if (activeTab === 'profile') {
              // If already on profile, show logout option
              onLogout();
            } else {
              setActiveTab('profile');
            }
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
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.small,
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
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
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
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginRight: SPACING.md,
    width: 300,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statusBadge: {
    backgroundColor: COLORS.healthGreen,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.round,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
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
  reportCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginRight: SPACING.md,
    width: 280,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.healthGreen,
    ...SHADOWS.medium,
  },
  statusIndicator: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.round,
  },
  reportInfo: {
    marginBottom: SPACING.md,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reportType: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
  },
  reportStatus: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
  },
  reportDate: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  reportDoctor: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
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
  viewReportText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
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
