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
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Sample data for new schemes (user eligible)
const newSchemes = [
  {
    id: 1,
    name: 'प्रधानमंत्री जन आरोग्य योजना',
    description: 'मुफ्त स्वास्थ्य बीमा कवरेज ₹5 लाख तक',
    eligibility: 'पात्र',
    benefits: '₹5,00,000 वार्षिक कवरेज',
    lastDate: '31 दिसंबर 2025',
    category: 'स्वास्थ्य बीमा',
    documents: ['आधार कार्ड', 'राशन कार्ड', 'आय प्रमाण पत्र']
  },
  {
    id: 2,
    name: 'आयुष्मान भारत डिजिटल मिशन',
    description: 'डिजिटल स्वास्थ्य आईडी और ऑनलाइन परामर्श',
    eligibility: 'पात्र',
    benefits: 'मुफ्त डिजिटल स्वास्थ्य सेवाएं',
    lastDate: '15 सितंबर 2025',
    category: 'डिजिटल स्वास्थ्य',
    documents: ['आधार कार्ड', 'मोबाइल नंबर']
  },
  {
    id: 3,
    name: 'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम',
    description: '0-18 वर्ष के बच्चों के लिए मुफ्त स्वास्थ्य जांच',
    eligibility: 'पात्र',
    benefits: 'मुफ्त जांच और इलाज',
    lastDate: '30 नवंबर 2025',
    category: 'बाल स्वास्थ्य',
    documents: ['जन्म प्रमाण पत्र', 'आधार कार्ड']
  }
];

// Sample data for applied schemes (pending approval)
const appliedSchemes = [
  {
    id: 4,
    name: 'मातृत्व सहायता योजना',
    description: 'गर्भवती महिलाओं के लिए वित्तीय सहायता',
    appliedDate: '15 जुलाई 2025',
    status: 'प्रक्रियाधीन',
    applicationId: 'MAT2025001234',
    estimatedTime: '15-20 कार्य दिवस',
    currentStage: 'दस्तावेज सत्यापन'
  },
  {
    id: 5,
    name: 'वरिष्ठ नागरिक स्वास्थ्य योजना',
    description: '60+ वर्ष के लिए विशेष स्वास्थ्य सुविधाएं',
    appliedDate: '08 जुलाई 2025',
    status: 'समीक्षाधीन',
    applicationId: 'SEN2025005678',
    estimatedTime: '7-10 कार्य दिवस',
    currentStage: 'पात्रता जांच'
  }
];

// Sample data for approved schemes
const approvedSchemes = [
  {
    id: 6,
    name: 'राष्ट्रीय स्वास्थ्य बीमा योजना',
    description: 'परिवार के लिए ₹3 लाख का स्वास्थ्य बीमा',
    approvedDate: '25 जून 2025',
    validTill: '25 जून 2026',
    beneficiaryId: 'RSBY2025987654',
    benefits: '₹3,00,000 वार्षिक कवरेज',
    status: 'सक्रिय'
  },
  {
    id: 7,
    name: 'निःशुल्क दवा योजना',
    description: 'सरकारी अस्पतालों में मुफ्त दवाएं',
    approvedDate: '10 जून 2025',
    validTill: 'आजीवन',
    beneficiaryId: 'MED2025123456',
    benefits: 'मुफ्त जेनेरिक दवाएं',
    status: 'सक्रिय'
  },
  {
    id: 8,
    name: 'महिला स्वास्थ्य योजना',
    description: 'महिलाओं के लिए विशेष स्वास्थ्य जांच',
    approvedDate: '05 मई 2025',
    validTill: '05 मई 2026',
    beneficiaryId: 'WOM2025456789',
    benefits: 'वार्षिक मुफ्त जांच',
    status: 'सक्रिय'
  }
];

interface SchemesScreenProps {
  onBack: () => void;
}

const SchemesScreen: React.FC<SchemesScreenProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('new');

  const renderNewSchemeCard = ({ item }: { item: any }) => (
    <LinearGradient
      colors={COLORS.gradients.card.colors}
      start={COLORS.gradients.card.start}
      end={COLORS.gradients.card.end}
      style={styles.schemeCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.schemeInfo}>
          <Text style={styles.schemeName}>{item.name}</Text>
          <LinearGradient
            colors={['#27ae60', '#2ecc71']}
            style={styles.eligibilityBadge}
          >
            <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
            <Text style={styles.eligibilityText}>{item.eligibility}</Text>
          </LinearGradient>
        </View>
      </View>
      
      <Text style={styles.schemeDescription}>{item.description}</Text>
      
      <View style={styles.schemeDetails}>
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.healthBlue + '20', COLORS.healthBlue + '10']}
            style={styles.detailIcon}
          >
            <FontAwesome5 name="gift" size={14} color={COLORS.healthBlue} />
          </LinearGradient>
          <Text style={styles.detailText}>{item.benefits}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.warning + '20', COLORS.warning + '10']}
            style={styles.detailIcon}
          >
            <Ionicons name="time" size={14} color={COLORS.warning} />
          </LinearGradient>
          <Text style={styles.detailText}>अंतिम तिथि: {item.lastDate}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.accent + '20', COLORS.accent + '10']}
            style={styles.detailIcon}
          >
            <MaterialIcons name="category" size={14} color={COLORS.accent} />
          </LinearGradient>
          <Text style={styles.detailText}>{item.category}</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderAppliedSchemeCard = ({ item }: { item: any }) => (
    <LinearGradient
      colors={COLORS.gradients.card.colors}
      start={COLORS.gradients.card.start}
      end={COLORS.gradients.card.end}
      style={styles.schemeCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.schemeInfo}>
          <Text style={styles.schemeName}>{item.name}</Text>
          <LinearGradient
            colors={['#f39c12', '#e67e22']}
            style={styles.statusBadge}
          >
            <Ionicons name="hourglass" size={14} color={COLORS.white} />
            <Text style={styles.statusText}>{item.status}</Text>
          </LinearGradient>
        </View>
      </View>
      
      <Text style={styles.schemeDescription}>{item.description}</Text>
      
      <View style={styles.schemeDetails}>
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.info + '20', COLORS.info + '10']}
            style={styles.detailIcon}
          >
            <FontAwesome5 name="id-card" size={14} color={COLORS.info} />
          </LinearGradient>
          <Text style={styles.detailText}>आवेदन ID: {item.applicationId}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.healthGreen + '20', COLORS.healthGreen + '10']}
            style={styles.detailIcon}
          >
            <Ionicons name="calendar" size={14} color={COLORS.healthGreen} />
          </LinearGradient>
          <Text style={styles.detailText}>आवेदन दिनांक: {item.appliedDate}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.accent + '20', COLORS.accent + '10']}
            style={styles.detailIcon}
          >
            <MaterialIcons name="timeline" size={14} color={COLORS.accent} />
          </LinearGradient>
          <Text style={styles.detailText}>वर्तमान चरण: {item.currentStage}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.warning + '20', COLORS.warning + '10']}
            style={styles.detailIcon}
          >
            <Ionicons name="time" size={14} color={COLORS.warning} />
          </LinearGradient>
          <Text style={styles.detailText}>अनुमानित समय: {item.estimatedTime}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.trackButton}
        onPress={() => Alert.alert('ट्रैक करें', `आवेदन ID: ${item.applicationId} की स्थिति देखें`)}
        activeOpacity={0.8}
      >
        <Text style={styles.trackButtonText}>स्थिति ट्रैक करें</Text>
        <Ionicons name="eye" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderApprovedSchemeCard = ({ item }: { item: any }) => (
    <LinearGradient
      colors={COLORS.gradients.card.colors}
      start={COLORS.gradients.card.start}
      end={COLORS.gradients.card.end}
      style={styles.schemeCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.schemeInfo}>
          <Text style={styles.schemeName}>{item.name}</Text>
          <LinearGradient
            colors={['#27ae60', '#2ecc71']}
            style={styles.approvedBadge}
          >
            <Ionicons name="checkmark-done" size={14} color={COLORS.white} />
            <Text style={styles.approvedText}>स्वीकृत</Text>
          </LinearGradient>
        </View>
      </View>
      
      <Text style={styles.schemeDescription}>{item.description}</Text>
      
      <View style={styles.schemeDetails}>
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.success + '20', COLORS.success + '10']}
            style={styles.detailIcon}
          >
            <FontAwesome5 name="id-badge" size={14} color={COLORS.success} />
          </LinearGradient>
          <Text style={styles.detailText}>लाभार्थी ID: {item.beneficiaryId}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.healthBlue + '20', COLORS.healthBlue + '10']}
            style={styles.detailIcon}
          >
            <Ionicons name="calendar" size={14} color={COLORS.healthBlue} />
          </LinearGradient>
          <Text style={styles.detailText}>स्वीकृति दिनांक: {item.approvedDate}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.info + '20', COLORS.info + '10']}
            style={styles.detailIcon}
          >
            <MaterialIcons name="event-available" size={14} color={COLORS.info} />
          </LinearGradient>
          <Text style={styles.detailText}>वैधता: {item.validTill}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <LinearGradient
            colors={[COLORS.accent + '20', COLORS.accent + '10']}
            style={styles.detailIcon}
          >
            <FontAwesome5 name="gift" size={14} color={COLORS.accent} />
          </LinearGradient>
          <Text style={styles.detailText}>{item.benefits}</Text>
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.benefitsButton}
          onPress={() => Alert.alert('लाभ', `${item.name} के सभी लाभ देखें`)}
          activeOpacity={0.8}
        >
          <Text style={styles.benefitsButtonText}>लाभ देखें</Text>
          <MaterialIcons name="info" size={16} color={COLORS.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => Alert.alert('डाउनलोड', 'प्रमाण पत्र डाउनलोड करें')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={COLORS.gradients.accent.colors}
            start={COLORS.gradients.accent.start}
            end={COLORS.gradients.accent.end}
            style={styles.downloadButtonGradient}
          >
            <Text style={styles.downloadButtonText}>प्रमाण पत्र</Text>
            <Ionicons name="download" size={16} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'new':
        return (
          <FlatList
            data={newSchemes}
            renderItem={renderNewSchemeCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        );
      case 'applied':
        return (
          <FlatList
            data={appliedSchemes}
            renderItem={renderAppliedSchemeCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        );
      case 'approved':
        return (
          <FlatList
            data={approvedSchemes}
            renderItem={renderApprovedSchemeCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Section Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'new' && styles.activeTab]}
          onPress={() => setActiveSection('new')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={activeSection === 'new' ? 
              COLORS.gradients.primary.colors : 
              ['transparent', 'transparent']}
            style={styles.tabGradient}
          >
            <MaterialIcons 
              name="new-releases" 
              size={18} 
              color={activeSection === 'new' ? COLORS.white : COLORS.textSecondary} 
            />
            <Text style={[
              styles.tabText, 
              activeSection === 'new' && styles.activeTabText
            ]}>
              नई योजनाएं
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeSection === 'applied' && styles.activeTab]}
          onPress={() => setActiveSection('applied')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={activeSection === 'applied' ? 
              ['#f39c12', '#e67e22'] : 
              ['transparent', 'transparent']}
            style={styles.tabGradient}
          >
            <MaterialIcons 
              name="pending" 
              size={18} 
              color={activeSection === 'applied' ? COLORS.white : COLORS.textSecondary} 
            />
            <Text style={[
              styles.tabText, 
              activeSection === 'applied' && styles.activeTabText
            ]}>
              आवेदित
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeSection === 'approved' && styles.activeTab]}
          onPress={() => setActiveSection('approved')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={activeSection === 'approved' ? 
              ['#27ae60', '#2ecc71'] : 
              ['transparent', 'transparent']}
            style={styles.tabGradient}
          >
            <Ionicons 
              name="checkmark-done-circle" 
              size={18} 
              color={activeSection === 'approved' ? COLORS.white : COLORS.textSecondary} 
            />
            <Text style={[
              styles.tabText, 
              activeSection === 'approved' && styles.activeTabText
            ]}>
              स्वीकृत
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
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
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  schemeCard: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    ...SHADOWS.large,
    elevation: 8,
  },
  cardHeader: {
    marginBottom: SPACING.md,
  },
  schemeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  schemeName: {
    fontSize: FONTS.sizes.base,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  eligibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.small,
  },
  eligibilityText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: FONTS.weights.semibold,
    marginLeft: SPACING.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.small,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: FONTS.weights.semibold,
    marginLeft: SPACING.xs,
  },
  approvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.small,
  },
  approvedText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: FONTS.weights.semibold,
    marginLeft: SPACING.xs,
  },
  schemeDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  schemeDetails: {
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  detailText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  trackButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginRight: SPACING.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  benefitsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  benefitsButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  downloadButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  downloadButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    marginRight: SPACING.xs,
  },
});

export default SchemesScreen;
