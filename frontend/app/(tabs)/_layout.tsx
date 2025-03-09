import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout(){
    return (
        <Tabs screenOptions={{
            tabBarStyle: { backgroundColor: '#413F6F' },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tabs.Screen name='home'
                options={{title: 'Home',
                tabBarIcon: ({ color }) => (<Ionicons name="home-outline" size={24} color={color} />),
            }} />
            <Tabs.Screen name='search'
                options={{title: 'Search',
                tabBarIcon: ({color}) => (<Ionicons name="search" size={24} color={color}/>),
            }} />
            <Tabs.Screen name='stats'
                options={{title: 'Stats',
                tabBarIcon: ({ color }) => (<Ionicons name="bar-chart-outline" size={24} color={color} />),
            }} />
            <Tabs.Screen name='profile'
                options={{title: 'Profile',
                tabBarIcon: ({ color }) => (<Ionicons name="person-outline" size={24} color={color} />),
            }} />
        </Tabs>
    );
}